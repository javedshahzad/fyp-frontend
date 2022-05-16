import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageArchivePage } from './manage-archive.page';

const routes: Routes = [
  {
    path: '',
    component: ManageArchivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageArchivePageRoutingModule {}
