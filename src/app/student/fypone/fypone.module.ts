import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FyponePageRoutingModule } from './fypone-routing.module';

import { FyponePage } from './fypone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FyponePageRoutingModule
  ],
  declarations: [FyponePage]
})
export class FyponePageModule {}
