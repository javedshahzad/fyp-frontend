import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAssessmentPageRoutingModule } from './manage-assessment-routing.module';

import { ManageAssessmentPage } from './manage-assessment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAssessmentPageRoutingModule
  ],
  declarations: [ManageAssessmentPage]
})
export class ManageAssessmentPageModule {}
