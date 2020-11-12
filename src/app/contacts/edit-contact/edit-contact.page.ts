import { Component, OnInit } from '@angular/core';
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
  constructor(
    private acivatedRoute: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.acivatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('contactId')) {return;}
      const contactsId = paramMap.get('contactId');
      console.log(contactsId);
      this.loadedContact = this.contactService.getContacts(contactsId).subscribe((res)=>{
        console.log(res);
        this.loadedContact = res[0];
      });
    });
  }

  onSubmit(form: NgForm){
    console.log(form.value);

    const contacts = {
      id: this.loadedContact.id,
      nama: form.value.nama,
      phone: form.value.phone,
      email: form.value.email,
    };
    this.contactService.updateContact(contacts).subscribe(res => {
      console.log(res);
    });
    this.router.navigateByUrl('/contacts');
  }
}
