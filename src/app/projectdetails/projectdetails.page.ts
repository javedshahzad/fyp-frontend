import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.page.html',
  styleUrls: ['./projectdetails.page.scss'],
})
export class ProjectdetailsPage implements OnInit {
  @Input()studName: string;
  @Input()matrixNo: string;
  @Input()email: string;
  @Input()phoneNum: string;
  @Input()title: string;
  @Input()topicType: string;
  @Input()skill: string;
  @Input()problemStmt: string;
  @Input()objective: string;
  @Input()outcome: string;
  @Input()description: string;
  constructor(
    private modalController: ModalController,
  ) {

   }

  ngOnInit() {

  }
  dismissModal() {
    // const onClosedData: string = "Wrapped Up!";
     this.modalController.dismiss();
  }

}
