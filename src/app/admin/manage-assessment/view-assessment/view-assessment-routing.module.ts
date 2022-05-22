import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAssessmentPage } from './view-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAssessmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAssessmentPageRoutingModule {}
