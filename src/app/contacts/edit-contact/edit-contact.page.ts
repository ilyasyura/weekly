import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contacts } from '../contacts.model';
import { ContactsService } from '../contacts.service';

declare var google: any;

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

  loadedContact: any;
  key: string;

  @ViewChild('f', null) f: NgForm;

  map: any;
  infoWindow: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  dataLat: number;
  dataLng: number;
  constructor(
    private acivatedRoute: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    //mysql
    // this.acivatedRoute.paramMap.subscribe(paramMap => {
    //   if(!paramMap.has('contactId')) {return;}
    //   const contactsId = paramMap.get('contactId');
    //   console.log(contactsId);
    //   this.loadedContact = this.contactService.getContacts(contactsId).subscribe((res)=>{
    //     console.log(res);
    //     this.loadedContact = res[0];
    //   });
    // });

    //firebase
    this.acivatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('key')) {return;}
      const key = paramMap.get('key');
      this.key = key;

      this.loadedContact = this.db.object('/contacts/' + key).valueChanges().subscribe(data =>{
        console.log(data);
        this.loadedContact = data;
        console.log(this.loadedContact);
      });
    });

    setTimeout(()=>{
      this.f.setValue(this.loadedContact);
    })
  }

  ionViewDidEnter(){
    this.initMap(this.loadedContact);
  }

  initMap(pos: any){
    var addressPos: any = {
      lat: pos.lat,
      lng: pos.lng
    };

    const location = new google.maps.LatLng(pos.lat, pos.lng);
    const options = {
      center: location,
      zoom: 10
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.infoWindow = new google.maps.InfoWindow({
      content: 'Click new location for this contact!',
      position: addressPos
    });
    this.infoWindow.open(this.map);

    this.map.addListener('click', (mapsMouseEvent) => {
      this.infoWindow.close();

      this.infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      this.infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      console.log(mapsMouseEvent.latLng.toJSON());
      this.dataLat = mapsMouseEvent.latLng.toJSON().lat;
      this.dataLng = mapsMouseEvent.latLng.toJSON().lng;
      this.infoWindow.open(this.map);
    });
  }

  onSubmit(form: NgForm){
    console.log(form.value);

    //mysql
    // const contacts = {
    //   id: this.loadedContact.id,
    //   nama: form.value.nama,
    //   phone: form.value.phone,
    //   email: form.value.email,
    // };
    // this.contactService.updateContact(contacts).subscribe(res => {
    //   console.log(res);
    // });

    //firebase
    this.contactService.updateContact(this.key, form.value).then(res => {
      console.log(res);
      this.router.navigateByUrl('/contacts');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('/contacts');
  }
}
