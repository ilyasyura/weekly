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
  {
    path: 'week10/index',
    loadChildren: () => import('./week10/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'week10/create',
    loadChildren: () => import('./week10/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'week10/edit/:key',
    loadChildren: () => import('./week10/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'week11/login',
    loadChildren: () => import('./week11/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'week11/register',
    loadChildren: () => import('./week11/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./week11/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'week12/display-map',
    loadChildren: () => import('./week12/display-map/display-map.module').then( m => m.DisplayMapPageModule)
  },
  {
    path: 'week12/current-loc',
    loadChildren: () => import('./week12/current-loc/current-loc.module').then( m => m.CurrentLocPageModule)
  },
  {
    path: 'week12/loc-coordinate',
    loadChildren: () => import('./week12/loc-coordinate/loc-coordinate.module').then( m => m.LocCoordinatePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
