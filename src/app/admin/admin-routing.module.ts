import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';


const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'manage-account',
    loadChildren: () => import('./manage-account/manage-account.module').then( m => m.ManageAccountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
