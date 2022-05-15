import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamineTopicPage } from './examine-topic.page';

const routes: Routes = [
  {
    path: '',
    component: ExamineTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamineTopicPageRoutingModule {}
