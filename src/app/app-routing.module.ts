import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'students1',
    loadChildren: () => import('./week8/students1/students1.module').then( m => m.Students1PageModule)
  },
  {
    path: 'students2',
    loadChildren: () => import('./week8/students2/students2.module').then( m => m.Students2PageModule)
  },
  {
    path: 'students3',
    loadChildren: () => import('./week8/students3/students3.module').then( m => m.Students3PageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'week9/index',
    loadChildren: () => import('./week9/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'week9/insert',
    loadChildren: () => import('./week9/insert/insert.module').then( m => m.InsertPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
