import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAssessmentPage } from './manage-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAssessmentPage
  },
  {
    path: 'view-assessment',
    loadChildren: () => import('./view-assessment/view-assessment.module').then( m => m.ViewAssessmentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAssessmentPageRoutingModule {}
