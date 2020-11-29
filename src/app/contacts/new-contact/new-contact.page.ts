import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contacts } from '../contacts.model';
import { ContactsService } from '../contacts.service';

declare var google: any;

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {

  map: any;
  infoWindow: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  defaultLoc: any = {
    lat: -6.256081,
    lng: 106.618755
  };
  res: any=[];
  data: Observable<any>;

  dataLat: string;
  dataLng: string;
  // contacts: Contacts[];
  constructor(
    private contactService: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.initMap(this.defaultLoc);
  }

  initMap(pos: any){
    const location = new google.maps.LatLng(pos.lat, pos.lng);
    const options = {
      center: location,
      zoom: 10
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.infoWindow = new google.maps.InfoWindow({
      content: 'Click the map to get Contact Location!',
      position: this.defaultLoc
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
    console.log(form);
    
    // const contacts: Contacts = {
    //   id: form.value.id,
    //   nama: form.value.nama,
    //   telp: (form.value.telp).split(','),
    //   email: (form.value.email).split(","),
    // };
    // this.contactService.addContact(contacts);
    // this.router.navigateByUrl('/contacts');

    //mysql
    // const cont = {
    //   id: form.value.id,
    //   nama: form.value.nama,
    //   phone: form.value.phone,
    //   email: form.value.email,
    // };

    // this.contactService.addContact(cont).subscribe(res => {
    //   console.log(res);
    // });

    //firebase
    this.contactService.addContact(form.value).then(res => {
      console.log(res);
      this.router.navigateByUrl('/contacts');
    }).catch(error=> console.log(error));

    this.router.navigateByUrl('/contacts');
  }

}
