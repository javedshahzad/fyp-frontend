import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FyponePage } from './fypone.page';

const routes: Routes = [
  {
    path: '',
    component: FyponePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FyponePageRoutingModule {}
