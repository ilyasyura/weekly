import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contacts } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

  loadedContact: any;
  key: string;

  @ViewChild('f', null) f: NgForm;

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
