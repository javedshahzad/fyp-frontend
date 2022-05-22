import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageArchivePage } from './manage-archive.page';

const routes: Routes = [
  {
    path: '',
    component: ManageArchivePage
  },
  {
    path: 'add-archive',
    loadChildren: () => import('./add-archive/add-archive.module').then( m => m.AddArchivePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageArchivePageRoutingModule {}
