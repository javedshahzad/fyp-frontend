import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEvaluationPage } from './add-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: AddEvaluationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEvaluationPageRoutingModule {}
