import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {

  lecturerID;
  courseID;
  roleIDS;
  roleIDE;
  allSuProjectData;
  allExProjectData;
  constructor(
    private apiService: ApiService,
    public navCtrl: NavController,
    private loadingService: LoadingService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // this.courseID=1;
    // this.getSuperviseData();
  }

  getSuperviseData(){
    // this.loadingService.showLoader();
    this.roleIDS =0;
    this.lecturerID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('lectID', this.lecturerID);
    formData.append('courseID', this.courseID);
    formData.append('roleID', this.roleIDS);
    this.apiService.postData('https://fypmanagementbackend.in/EvaluationAPI/getStudent.php',formData).subscribe((res: any)=>{
      console.log(res);
      // this.loadingService.hideLoader();
      if(res.err === false){
        this.allSuProjectData=res.data;
      }else{
        this.allSuProjectData=[];
        this.showAlert(res.message);
      }
    });
  }

  getExamineData(){
    // this.loadingService.showLoader();
    this.roleIDE =1;
    this.lecturerID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('lectID', this.lecturerID);
    formData.append('courseID', this.courseID);
    formData.append('roleID', this.roleIDE);
    this.apiService.postData('https://fypmanagementbackend.in/EvaluationAPI/getStudent.php',formData).subscribe((res: any)=>{
      console.log(res);
      // this.loadingService.hideLoader();
      if(res.err === false){
        this.allExProjectData=res.data;
      }else{
        this.allExProjectData=[];
      }
    });
  }

  changeCourse(value){
    console.log(this.courseID);
    this.getSuperviseData();
    this.getExamineData();
  }

  showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Alert Message',
        message,
        backdropDismiss:false,
        buttons: [
          {
           text: 'Okay',
           id: 'confirm-button',
           handler: () => {
           //  console.log('Confirm Okay');
            //  this.nav.navigateBack('login');
            //  localStorage.setItem('userGroupID','');
           }
         }
       ]
      })
      .then(alertEl => alertEl.present());
  }

  async evaluate(item){
    await this.navCtrl.navigateForward('/lecturer/evaluation/evaluate-selected',{queryParams:{data:item}});
  }

}
