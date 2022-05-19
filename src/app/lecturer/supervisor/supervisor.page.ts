import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {
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
    this.roleID =0;
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

  async openDetails(item) {

    await this.navCtrl.navigateForward('/lecturer/supervisor/assessment',{queryParams:{data:item}});
}
}
