import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AlertController} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  lectProjectID: any;
  assessmentID: any;
  lectComment: any;
  title: any;
  approvalID: any;
  allApproval;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.queryParams.subscribe((res: any)=>{
      console.log(res);
      this.lectProjectID = res.data.lectProjectID;
      this.assessmentID=res.data.assessmentID;
    });
   }

  ngOnInit() {
    this.getApproval();
  }

  onSubmit(){
    const formData =new FormData();
    formData.append('lectProjectID', this.lectProjectID);
    formData.append('lectComment', this.lectComment);
    formData.append('assessmentID', this.assessmentID);
    formData.append('approvalID', this.approvalID);
    this.apiService.postData('https://fypmanagementbackend.in/AssessmentReviewAPI/update.php',formData).subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.showAlert(res.message);
      }else{
        this.showAlert(res.message);
      }
    });
  }

  getApproval(){
    this.apiService.getData('https://fypmanagementbackend.in/ApprovalAPI/read.php').subscribe((res: any)=>{
      console.log(res);
      if(res){
        this.allApproval=res.data;
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
