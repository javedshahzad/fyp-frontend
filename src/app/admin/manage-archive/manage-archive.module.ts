import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageArchivePageRoutingModule } from './manage-archive-routing.module';

import { ManageArchivePage } from './manage-archive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageArchivePageRoutingModule
  ],
  declarations: [ManageArchivePage]
})
export class ManageArchivePageModule {}
