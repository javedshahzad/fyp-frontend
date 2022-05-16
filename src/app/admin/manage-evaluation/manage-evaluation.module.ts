import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageEvaluationPageRoutingModule } from './manage-evaluation-routing.module';

import { ManageEvaluationPage } from './manage-evaluation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageEvaluationPageRoutingModule
  ],
  declarations: [ManageEvaluationPage]
})
export class ManageEvaluationPageModule {}
