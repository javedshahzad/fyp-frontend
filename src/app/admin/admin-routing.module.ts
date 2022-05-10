import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { ManageAccountComponent } from './manage-account/manage-account.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path:'manage_account',
    component: ManageAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
