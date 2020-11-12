import { Component, OnInit } from '@angular/core';
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
  contactSub: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactsService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('contactId')) {return;}
      const contactsId = paramMap.get('contactId');
      console.log(contactsId);
      this.loadedContact = this.contactService.getContacts(contactsId).subscribe((res)=>{
        console.log(res);
        this.loadedContact = res[0];
      });
    });
    // this.loadedContact = this.contactService.getContacts(contactsId);
      // this.contactSub = this.contactService.getContacts(contactsId).subscribe(contacts =>{
      //   this.loadedContact = contacts;
      // })
  }

  async deleteAlert(contactId: string){
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
          handler: () => this.deleteContact(contactId)
        }
      ]
    });
    await alert.present();
  }

  deleteContact(contactId: string){
    this.contactService.deleteContact(contactId).subscribe((res) => {
      console.log(res);
    });
    this.router.navigateByUrl('/contacts');
  }

}
