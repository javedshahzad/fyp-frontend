import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTopicModalPage } from './add-topic-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddTopicModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTopicModalPageRoutingModule {}
