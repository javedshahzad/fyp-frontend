import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAssessmentPageRoutingModule } from './view-assessment-routing.module';

import { ViewAssessmentPage } from './view-assessment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAssessmentPageRoutingModule
  ],
  declarations: [ViewAssessmentPage]
})
export class ViewAssessmentPageModule {}
