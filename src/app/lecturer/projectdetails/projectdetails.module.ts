import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectdetailsPageRoutingModule } from './projectdetails-routing.module';

import { ProjectdetailsPage } from './projectdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectdetailsPageRoutingModule
  ],
  declarations: [ProjectdetailsPage]
})
export class ProjectdetailsPageModule {}
