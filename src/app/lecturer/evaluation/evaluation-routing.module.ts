import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationPage } from './evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationPage
  },
  {
    path: 'evaluate-selected',
    loadChildren: () => import('./evaluate-selected/evaluate-selected.module').then( m => m.EvaluateSelectedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationPageRoutingModule {}
