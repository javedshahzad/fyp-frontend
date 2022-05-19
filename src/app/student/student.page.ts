import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  studID;
  allStudentData;
  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private authProvider: AuthProvider,
    private menu: MenuController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    if(!this.authProvider.isStudent()){
      this.presentAlertConfirm();
    }else{
      this.getAssessmentData();
    }
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  getAssessmentData(){
    const formData =new FormData();
    this.studID = localStorage.getItem('accountID');
    formData.append('studID', this.studID);
    // const button = document.querySelector('ion-fab-button');
    // button.addEventListener('click', this.addTopic);

    this.apiService.getDataByID('https://fypmanagementbackend.in/ProjectAPI/read.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allStudentData=res.data[0];
      }else{
        this.showAlert();
      }
    });
  }

  showAlert() {
    this.alertController
      .create({
        header: 'Please Create Project',
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!',
      message: 'You are not login as Student,Please login.',
      mode:'ios',
      backdropDismiss:false,
      buttons: [
         {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.nav.navigateBack('login');
            localStorage.setItem('userGroupID','');
          }
        }
      ]
    });

    await alert.present();
  }
}
