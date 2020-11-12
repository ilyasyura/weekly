import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contacts } from './contacts.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: any;
  private contactSub: Subscription;
  constructor(
    private contactService: ContactsService
  ) { }

  ngOnInit() {
    // this.contactSub = this.contactService.getAllContacts().subscribe(contacts => {
    //   this.contacts = contacts;
    // });
    this.contactService.getAllContacts().subscribe((res) => {
      this.contacts = res;
      console.log(res);
    })
  }

  ionViewDidEnter(){
    this.contactService.getAllContacts().subscribe((res) => {
      this.contacts = res;
    });
  }

  // ngOnDestroy(){
  //   if(this.contactSub){
  //     this.contactSub.unsubscribe();
  //   }
  // }

}
