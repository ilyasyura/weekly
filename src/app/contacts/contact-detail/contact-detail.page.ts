import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/week11/services/auth.service';
import { Contacts } from '../contacts.model';
import { ContactsService } from '../contacts.service';

declare var google: any;

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  loadedContact: any;
  key: string;
  contactSub: Subscription;
  userNow: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactsService,
    private alertController: AlertController,
    private router: Router,
    private db: AngularFireDatabase,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      console.log(res);
      this.userNow = res;
    })
    //firebase
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('key')) {return;}
      const key = paramMap.get('key');
      this.key = key;

      this.loadedContact = this.db.object('/contacts/' + key).valueChanges().subscribe(data => {
        console.log('data: ', data);
        this.loadedContact = data;
        console.log('this.loadedContact: ', this.loadedContact);
      });
    });

    //mysql
    // this.activatedRoute.paramMap.subscribe(paramMap => {
    //   if(!paramMap.has('contactId')) {return;}
    //   const contactsId = paramMap.get('contactId');
    //   console.log(contactsId);
    //   this.loadedContact = this.contactService.getContacts(contactsId).subscribe((res)=>{
    //     console.log(res);
    //     this.loadedContact = res[0];
    //   });
    // });

    //rxjs
    // this.loadedContact = this.contactService.getContacts(contactsId);
      // this.contactSub = this.contactService.getContacts(contactsId).subscribe(contacts =>{
      //   this.loadedContact = contacts;
      // })
  }

  ionViewDidEnter(){
    this.showMap(this.loadedContact);
  }

  showMap(pos: any){
    var addressPos: any = {
      lat: pos.lat,
      lng: pos.lng
    };
    console.log(addressPos);
    const location = new google.maps.LatLng(pos.lat, pos.lng);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    const maker = new google.maps.Marker({
      position: addressPos,
      map: this.map
    });
  }

  async deleteAlert(key: string){
    const alert = await this.alertController.create({
      header: 'Delete Contact',
      message: 'Yakin bos?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yakin',
          handler: () => this.deleteContact(key)
        }
      ]
    });
    await alert.present();
  }

  deleteContact(key: string){
    //mysql
    // this.contactService.deleteContact(contactId).subscribe((res) => {
    //   console.log(res);
    // });

    this.contactService.deleteContact(key).then(res=>{
      console.log(res);
    });
    this.router.navigateByUrl('/contacts');
  }

}
