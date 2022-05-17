import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LecturerPage } from './lecturer.page';

const routes: Routes = [
  {
    path: '',
    component: LecturerPage
  },
  {
    path: 'manage-topic',
    loadChildren: () => import('./manage-topic/manage-topic.module').then( m => m.ManageTopicPageModule)
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./supervisor/supervisor.module').then( m => m.SupervisorPageModule)
  },
  {
    path: 'examiner',
    loadChildren: () => import('./examiner/examiner.module').then( m => m.ExaminerPageModule)
  },
  {
    path: 'evaluation',
    loadChildren: () => import('./evaluation/evaluation.module').then( m => m.EvaluationPageModule)
  },
  {
    path: 'examine-topic',
    loadChildren: () => import('./examine-topic/examine-topic.module').then( m => m.ExamineTopicPageModule)
  },
  {
    path: 'student-application',
    loadChildren: () => import('./student-application/student-application.module').then( m => m.StudentApplicationPageModule)
  },
  {
    path: 'add-topic-modal',
    loadChildren: () => import('./add-topic-modal/add-topic-modal.module').then( m => m.AddTopicModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturerPageRoutingModule {}
