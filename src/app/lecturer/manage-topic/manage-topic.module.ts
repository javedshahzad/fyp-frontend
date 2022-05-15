import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTopicPageRoutingModule } from './manage-topic-routing.module';

import { ManageTopicPage } from './manage-topic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTopicPageRoutingModule
  ],
  declarations: [ManageTopicPage]
})
export class ManageTopicPageModule {}
