import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageEvaluationPage } from './manage-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: ManageEvaluationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageEvaluationPageRoutingModule {}
