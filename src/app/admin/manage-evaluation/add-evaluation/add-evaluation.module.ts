import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEvaluationPageRoutingModule } from './add-evaluation-routing.module';

import { AddEvaluationPage } from './add-evaluation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEvaluationPageRoutingModule
  ],
  declarations: [AddEvaluationPage]
})
export class AddEvaluationPageModule {}
