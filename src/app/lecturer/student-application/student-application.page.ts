import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.page.html',
  styleUrls: ['./student-application.page.scss'],
})
export class StudentApplicationPage implements OnInit {
  lecturerID: string;
  allApplications: any=[];

  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit() {
    this.getData();
  }
getData(){
  this.lecturerID=localStorage.getItem('accountID');
  const formData =new FormData();
  formData.append('lectID', this.lecturerID);
  this.apiService.postData('https://fypmanagementbackend.in/studentApplicationAPI/readByLecturerID.php',formData).subscribe((res:any)=>{
    console.log(res);
    if(res.err === false){
      this.allApplications=res.data;
    }
  })
}
}
