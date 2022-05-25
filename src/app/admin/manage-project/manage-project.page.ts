import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.page.html',
  styleUrls: ['./manage-project.page.scss'],
})
export class ManageProjectPage implements OnInit {
  allProject;
  isHave;
  condition;
  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  waitingApprove(){
    this.apiService.getData('https://fypmanagementbackend.in/ProjectAPI/readbyhaveApprove.php')
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allProject=res.data;
        this.condition = 'Approve';
        this.isHave = 0;
      }else{
        this.showAlert(res.message);
      }
    });
  }

  noExaminer(){
    this.apiService.getData('https://fypmanagementbackend.in/ProjectAPI/readbyhaveExaminer.php')
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allProject=res.data;
        this.condition = 'Examiner';
        this.isHave=0;
      }else{
        this.showAlert(res.message);
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
