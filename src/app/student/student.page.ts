import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  constructor(
    private alertController:AlertController,
    private nav:NavController,
    private authProvider: AuthProvider,
  ) { }

  ngOnInit() {
    if(!this.authProvider.isStudent()){
      this.presentAlertConfirm();
    }
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
