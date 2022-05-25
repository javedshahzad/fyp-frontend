import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fypone',
  templateUrl: './fypone.page.html',
  styleUrls: ['./fypone.page.scss'],
})
export class FyponePage implements OnInit {

  courseID;
  studID;
  allAssessmentData;
  allAssessmentReviewData;
  assessmentName ='';
  file = '';
  assessmentID: any='';
  filePath: any;
  assesmentData: any;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.getAssessmentData();
  }

  getAssessmentData(){
    const formData =new FormData();
    this.courseID = 1;
    this.studID = localStorage.getItem('accountID');
    formData.append('courseID', this.courseID);
    formData.append('studID', this.studID);
    // const button = document.querySelector('ion-fab-button');
    // button.addEventListener('click', this.addTopic);

    this.apiService.getDataByID('https://fypmanagementbackend.in/AssessmentAPI/readAllAssessmentType.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allAssessmentData=res.data;
      }else{
        this.showAlert(res.message);
      }
    });
  }

  selectedAssessment(item){
    this.getReview(item.assessmentID);
    console.log(item);
    this.assesmentData=item;
    this.assessmentName = item.assessmentName;
    this.file = item.fileName;
    this.assessmentID=item.assessmentID;
    this.filePath=item.path;
    console.log(this.filePath);
  // this.supervisorComment = item.;
  // this.examinerComment='';
  // this.suApproval = '0';
  // this.exApproval = '0';
  }
  openfile(){
    window.open(this.filePath,'_blank');
  }
  getReview(assID){
    const formData =new FormData();
    formData.append('assessmentID', assID);
    this.apiService.getDataByID('https://fypmanagementbackend.in/AssessmentReviewAPI/read.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allAssessmentReviewData=res.data;
      }else{
        this.showAlert(res.message);
      }
    });
  }


  uploadFile(){
    if(this.assessmentID){
      this.nav.navigateForward('uploadfile',{queryParams:{assessmentID: this.assessmentID,data:this.assesmentData}});
    }else{
      this.showAlert('Please select project first');
    }
  }

  getFile(){

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
