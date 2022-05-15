import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchArchivePageRoutingModule } from './search-archive-routing.module';

import { SearchArchivePage } from './search-archive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchArchivePageRoutingModule
  ],
  declarations: [SearchArchivePage]
})
export class SearchArchivePageModule {}
