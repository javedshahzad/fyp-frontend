import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    private loadingService:LoadingService
  ) { }

  ngOnInit() {
    // this.courseID=1;
    // this.getSuperviseData();
  }

  getSuperviseData(){
    this.loadingService.showLoader();
    this.roleIDS =0;
    this.lecturerID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('lectID', this.lecturerID);
    formData.append('courseID', this.courseID);
    formData.append('roleID', this.roleIDS);
    this.apiService.postData('https://fypmanagementbackend.in/EvaluationAPI/getStudent.php',formData).subscribe((res: any)=>{
      console.log(res);
      this.loadingService.hideLoader();
      if(res.err === false){
        this.allSuProjectData=res.data;
      }else{
        this.allSuProjectData=[];
      }
    });
  }

  getExamineData(){
    this.loadingService.showLoader();
    this.roleIDE =1;
    this.lecturerID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('lectID', this.lecturerID);
    formData.append('courseID', this.courseID);
    formData.append('roleID', this.roleIDE);
    this.apiService.postData('https://fypmanagementbackend.in/EvaluationAPI/getStudent.php',formData).subscribe((res: any)=>{
      console.log(res);
      this.loadingService.hideLoader();
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

  async evaluate(item){
    await this.navCtrl.navigateForward('/lecturer/evaluation/evaluate-selected',{queryParams:{data:item}});
  }

}
