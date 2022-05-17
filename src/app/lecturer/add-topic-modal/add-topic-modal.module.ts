import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTopicModalPageRoutingModule } from './add-topic-modal-routing.module';

import { AddTopicModalPage } from './add-topic-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTopicModalPageRoutingModule
  ],
  declarations: [AddTopicModalPage]
})
export class AddTopicModalPageModule {}
