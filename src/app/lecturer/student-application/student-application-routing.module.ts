import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentApplicationPage } from './student-application.page';

const routes: Routes = [
  {
    path: '',
    component: StudentApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentApplicationPageRoutingModule {}
