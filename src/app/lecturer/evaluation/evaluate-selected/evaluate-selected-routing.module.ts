import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluateSelectedPage } from './evaluate-selected.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluateSelectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluateSelectedPageRoutingModule {}
