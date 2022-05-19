import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtopicPageRoutingModule } from './addtopic-routing.module';

import { AddtopicPage } from './addtopic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtopicPageRoutingModule
  ],
  declarations: [AddtopicPage]
})
export class AddtopicPageModule {}
