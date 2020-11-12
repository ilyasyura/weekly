import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Contacts } from './contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contacts = new BehaviorSubject<Contacts[]> ([
    new Contacts('contact1', 'John Thor', ['081212097789', '089899912821'], ['johnthor@gmail.com']),
    new Contacts('contact2', 'John Wick', ['081222190291'], ['johnwick@gmail.com', 'jwick@umn.ac.id'])
  ]);
  constructor(
    private http: HttpClient
  ) { }

  getAllContacts(){
    // return this.contacts.asObservable();
    return this.http.get('http://localhost:80/week9/contact/select.php');
  }

  getContacts(id: any){
    return this.http.get('http://localhost:80/week9/contact/select1.php?id=' + id);
    // return this.contacts.pipe(
    //   take(1),
    //   map(contacts => {
    //     return {...contacts.find(contact => contact.id === id)};
    //   })
    // );
  }

  addContact(contact: any){
    // this.getAllContacts().pipe(take(1)).subscribe(contacts => {
    //   this.contacts.next(contacts.concat(contact));
    // })

    const cont={
      id: contact.id,
      nama: contact.nama,
      phone: contact.phone,
      email: contact.email
    };
    const data = JSON.stringify(cont);
    return this.http.post<any>('http://localhost:80/week9/contact/insert.php', data);
  }

  deleteContact(contactId: string){
   const data = JSON.stringify(contactId);
   return this.http.post<any>('http://localhost:80/week9/contact/delete.php', data);
  }

  updateContact(newContact: any){
    // console.log(contact);
    // var id = contact.id;

    // this.deleteContact(id);

    // this.getAllContacts().pipe(take(1)).subscribe(contacts => {
    //   this.contacts.next(contacts.concat(contact));
    // })

    const contact = {
      id: newContact.id,
      nama: newContact.nama,
      email: newContact.email,
      phone: newContact.phone
    };
    const data = JSON.stringify(contact);
    return this.http.post<any>('http://localhost:80/week9/contact/update.php', data);
  }
}