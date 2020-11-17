import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
    //rxjs
    // this.contactSub = this.contactService.getAllContacts().subscribe(contacts => {
    //   this.contacts = contacts;
    // });

    //mysql
    // this.contactService.getAllContacts().subscribe((res) => {
    //   this.contacts = res;
    //   console.log(res);
    // })

    this.contactService.getAllContacts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe(data => {
      this.contacts = data;
      console.log(data);
    });
  }

  // ionViewDidEnter(){
  //   this.contactService.getAllContacts().subscribe((res) => {
  //     this.contacts = res;
  //   });
  // }

  // ngOnDestroy(){
  //   if(this.contactSub){
  //     this.contactSub.unsubscribe();
  //   }
  // }

}
