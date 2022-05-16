import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';


const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'manage-account',
    loadChildren: () => import('./manage-account/manage-account.module').then( m => m.ManageAccountPageModule)
  },
  {
    path: 'manage-project',
    loadChildren: () => import('./manage-project/manage-project.module').then( m => m.ManageProjectPageModule)
  },
  {
    path: 'manage-assessment',
    loadChildren: () => import('./manage-assessment/manage-assessment.module').then( m => m.ManageAssessmentPageModule)
  },
  {
    path: 'manage-evaluation',
    loadChildren: () => import('./manage-evaluation/manage-evaluation.module').then( m => m.ManageEvaluationPageModule)
  },
  {
    path: 'manage-archive',
    loadChildren: () => import('./manage-archive/manage-archive.module').then( m => m.ManageArchivePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
