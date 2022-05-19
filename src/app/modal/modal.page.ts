import { Component, OnInit,Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
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
    // private navParams: NavParams
  ) { }

  ngOnInit() {
    // console.table(this.navParams);
  }
   async dismissModal() {
    // const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss({
      //  dismissed: true
     });
  }
}
