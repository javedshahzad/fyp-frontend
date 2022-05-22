import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArchivePageRoutingModule } from './add-archive-routing.module';

import { AddArchivePage } from './add-archive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddArchivePageRoutingModule
  ],
  declarations: [AddArchivePage]
})
export class AddArchivePageModule {}
