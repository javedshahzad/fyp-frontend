import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageProjectPageRoutingModule } from './manage-project-routing.module';

import { ManageProjectPage } from './manage-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageProjectPageRoutingModule
  ],
  declarations: [ManageProjectPage]
})
export class ManageProjectPageModule {}
