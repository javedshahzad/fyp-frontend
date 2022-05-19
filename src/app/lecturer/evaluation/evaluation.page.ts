import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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
  ) { }

  ngOnInit() {
    // this.courseID=1;
    // this.getSuperviseData();
  }

  getSuperviseData(){
    this.roleIDS =0;
    this.lecturerID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('lectID', this.lecturerID);
    formData.append('courseID', this.courseID);
    formData.append('roleID', this.roleIDS);
    this.apiService.postData('https://fypmanagementbackend.in/SupervisorAPI/read.php',formData).subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.allSuProjectData=res.data;
      }else{
        this.allSuProjectData=[];
      }
    });
  }

  getExamineData(){
    this.roleIDE =1;
    this.lecturerID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('lectID', this.lecturerID);
    formData.append('courseID', this.courseID);
    formData.append('roleID', this.roleIDE);
    this.apiService.postData('https://fypmanagementbackend.in/SupervisorAPI/read.php',formData).subscribe((res: any)=>{
      console.log(res);
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

}
