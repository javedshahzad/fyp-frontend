import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.page.html',
  styleUrls: ['./view-assessment.page.scss'],
})
export class ViewAssessmentPage implements OnInit {
  name: any;
  evDescription;
  sortNum;
  allAssessment;
  typeID;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private activeRoute: ActivatedRoute,
    public navCtrl: NavController,
  ) {
    this.activeRoute.queryParams.subscribe((res: any)=>{
      this.typeID = res.assessmentTypeID;
      console.log(this.typeID);
    });
  }

  ngOnInit() {
    this.getAllAssessment();
  }

  getAllAssessment(){
    const formData =new FormData();
      formData.append('assessmentTypeID', this.typeID);
      this.apiService.getDataByID('https://fypmanagementbackend.in/ManageAssessmentAPI/readByAssessmentTypeID.php', formData)
      .subscribe((res: any) => {
        console.log(res);
        if(res.err === false){
          this.allAssessment=res.data;
          console.log(this.allAssessment);
        }else{
          this.showAlert(res.message);
        }
      });
  }
  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Message',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
