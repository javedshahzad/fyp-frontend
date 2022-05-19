import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtopicPage } from './addtopic.page';

const routes: Routes = [
  {
    path: '',
    component: AddtopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtopicPageRoutingModule {}
