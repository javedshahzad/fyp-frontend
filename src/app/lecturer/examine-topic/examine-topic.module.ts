import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamineTopicPageRoutingModule } from './examine-topic-routing.module';

import { ExamineTopicPage } from './examine-topic.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamineTopicPageRoutingModule
  ],
  declarations: [ExamineTopicPage]
})
export class ExamineTopicPageModule {}
