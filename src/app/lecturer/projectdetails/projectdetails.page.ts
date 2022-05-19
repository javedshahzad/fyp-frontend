import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.page.html',
  styleUrls: ['./projectdetails.page.scss'],
})
export class ProjectdetailsPage implements OnInit {
  studName: string;
  matrixNo: string;
  email: string;
  phoneNum: string;
  title: string;
  topicType: string;
  skill: string;
  problemStmt: string;
  objective: string;
  outcome: string;
  description: string;
  constructor(
    private modalController: ModalController,
    private ActiveRoute:ActivatedRoute
  ) {
      this.ActiveRoute.queryParams.subscribe((res:any)=>{
        console.log(res.data);
            this.studName= res.data.profileName,
            this.matrixNo= res.data.userName,
            this.email= res.data.email,
            this.phoneNum= res.data.phoneNum,
            this.title= res.data.title,
            this.topicType= res.data.topicTypeName,
            this.skill= res.data.skill,
            this.problemStmt= res.data.problemStmt,
            this.objective= res.data.objective,
            this.outcome= res.data.outcome,
            this.description= res.data.description
      })
   }

  ngOnInit() {

  }
  async dismissModal() {
    // const onClosedData: string = "Wrapped Up!";
     await this.modalController.dismiss(
       {
        // dismissed: true,
       }
     );
  }

}
