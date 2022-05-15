import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FyptwoPage } from './fyptwo.page';

const routes: Routes = [
  {
    path: '',
    component: FyptwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FyptwoPageRoutingModule {}
