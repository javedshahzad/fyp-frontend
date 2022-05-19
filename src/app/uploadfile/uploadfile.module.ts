import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadfilePageRoutingModule } from './uploadfile-routing.module';

import { UploadfilePage } from './uploadfile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadfilePageRoutingModule
  ],
  declarations: [UploadfilePage]
})
export class UploadfilePageModule {}
