import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FyptwoPageRoutingModule } from './fyptwo-routing.module';

import { FyptwoPage } from './fyptwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FyptwoPageRoutingModule
  ],
  declarations: [FyptwoPage]
})
export class FyptwoPageModule {}
