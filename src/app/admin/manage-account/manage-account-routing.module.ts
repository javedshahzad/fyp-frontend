import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAccountPage } from './manage-account.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAccountPage
  },
  {
    path: 'add-account',
    loadChildren: () => import('./add-account/add-account.module').then( m => m.AddAccountPageModule)
  },
  {
    path: 'update-account',
    loadChildren: () => import('./update-account/update-account.module').then( m => m.UpdateAccountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAccountPageRoutingModule {}
