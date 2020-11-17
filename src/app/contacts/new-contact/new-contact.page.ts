import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contacts } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {

  res: any=[];
  data: Observable<any>;
  // contacts: Contacts[];
  constructor(
    private contactService: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
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
