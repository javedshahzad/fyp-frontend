import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAssessmentPage } from './manage-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAssessmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAssessmentPageRoutingModule {}
