import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsPage } from './contacts.page';

const routes: Routes = [
  {
    path: '',
    component: ContactsPage
  },
  {
    path: 'detail/:contactId',
    loadChildren: () => import('./contact-detail/contact-detail.module').then( m => m.ContactDetailPageModule)
  },
  {
    path: 'new-contact',
    loadChildren: () => import('./new-contact/new-contact.module').then( m => m.NewContactPageModule)
  },
  {
    path: 'detail/edit/:contactId',
    loadChildren: () => import('./edit-contact/edit-contact.module').then( m => m.EditContactPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsPageRoutingModule {}
