import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageProjectPage } from './manage-project.page';

const routes: Routes = [
  {
    path: '',
    component: ManageProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageProjectPageRoutingModule {}
