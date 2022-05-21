import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluateSelectedPageRoutingModule } from './evaluate-selected-routing.module';

import { EvaluateSelectedPage } from './evaluate-selected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluateSelectedPageRoutingModule
  ],
  declarations: [EvaluateSelectedPage]
})
export class EvaluateSelectedPageModule {}
