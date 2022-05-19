import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectdetailsPage } from './projectdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectdetailsPageRoutingModule {}
