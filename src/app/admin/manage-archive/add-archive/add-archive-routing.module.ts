import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArchivePage } from './add-archive.page';

const routes: Routes = [
  {
    path: '',
    component: AddArchivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddArchivePageRoutingModule {}
