import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../week11/services/auth.service';
import { Contacts } from './contacts.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: any;
  userNow: any;
  private contactSub: Subscription;
  constructor(
    private contactService: ContactsService,
    private authSrv: AuthService,
    private navCtrl: NavController
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

    this.authSrv.userDetails().subscribe(res => {
      console.log(res);
      this.userNow = res;
    })

    this.contactService.getAllContacts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe(data => {
      this.contacts = data;
      console.log(data);
    });
  }

  logout(){
    this.authSrv.logoutUser()
      .then(res=>{
        console.log(res);
        this.navCtrl.navigateBack('/contacts');
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
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
