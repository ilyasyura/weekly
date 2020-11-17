import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Contacts } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {

  loadedContact: any;
  key: string;
  contactSub: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactsService,
    private alertController: AlertController,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
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
