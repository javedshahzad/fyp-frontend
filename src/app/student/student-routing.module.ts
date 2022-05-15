import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';

const routes: Routes = [
  {
    path: '',
    component: StudentPage
  },
  {
    path: 'project-detail',
    loadChildren: () => import('./project-detail/project-detail.module').then( m => m.ProjectDetailPageModule)
  },
  {
    path: 'fypone',
    loadChildren: () => import('./fypone/fypone.module').then( m => m.FyponePageModule)
  },
  {
    path: 'fyptwo',
    loadChildren: () => import('./fyptwo/fyptwo.module').then( m => m.FyptwoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
