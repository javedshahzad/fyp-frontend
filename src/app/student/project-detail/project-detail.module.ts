import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectDetailPageRoutingModule } from './project-detail-routing.module';

import { ProjectDetailPage } from './project-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProjectDetailPageRoutingModule
  ],
  declarations: [ProjectDetailPage]
})
export class ProjectDetailPageModule {}
