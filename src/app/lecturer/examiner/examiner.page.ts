import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  ) { }

  ngOnInit() {
    // this.courseID=1;
    // this.getSuperviseData();
  }

  getSuperviseData(){
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
      }
    });
  }

  changeCourse(value){
    console.log(this.courseID);
    this.getSuperviseData();
  }

  async openDetails(parameter: any) {
    await this.navCtrl.navigateForward(['/lecturer/supervisor/assessment/${parameter.uid}'], { state: { parameter } });
}
}
