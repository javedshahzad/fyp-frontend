import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.page.html',
  styleUrls: ['./examiner.page.scss'],
})
export class ExaminerPage implements OnInit {

  lecturerID;
  courseID;
  roleID;
  allProjectData;
  constructor(
    private apiService: ApiService,
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // this.courseID=1;
    // this.getSuperviseData();
  }

  getExamineData(){
    this.roleID =1;
    this.lecturerID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('lectID', this.lecturerID);
    formData.append('courseID', this.courseID);
    formData.append('roleID', this.roleID);
    this.apiService.postData('https://fypmanagementbackend.in/SupervisorAPI/read.php',formData).subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.allProjectData=res.data;
      }else{
        this.allProjectData=[];
        this.showAlert(res.message);
      }
    });
  }

  changeCourse(value){
    console.log(this.courseID);
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

  async openDetails(item) {
    await this.navCtrl.navigateForward('/lecturer/supervisor/assessment',{queryParams:{data:item}});
}
}
