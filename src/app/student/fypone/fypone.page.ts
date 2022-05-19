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
  assessmentName ='';
  file = '';
  supervisorComment = '';
  examinerComment='';
  suApproval = '0';
  exApproval = '0';
  assessmentID: any='';

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private nav:NavController
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
    console.log(item);
    this.assessmentName = item.assessmentName;
    this.supervisorComment==item.supervisorComment;
    this.examinerComment=item.examinerComment;
    this.exApproval=item.haveExaminer;
  this.file = item.file;
  this.assessmentID=item.assessmentID;
  // this.supervisorComment = item.;
  // this.examinerComment='';
  // this.suApproval = '0';
  // this.exApproval = '0';
  }


  uploadFile(){
    if(this.assessmentID){
      this.nav.navigateForward('uploadfile',{queryParams:{'assessmentID':this.assessmentID}});
    }else{
      this.showAlert('Please select project first')
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
