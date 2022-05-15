import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.page.html',
  styleUrls: ['./lecturer.page.scss'],
})
export class LecturerPage implements OnInit {

  constructor(
    private alertController:AlertController,
    private nav:NavController,
    private authProvider: AuthProvider,
  ) { }

  ngOnInit() {
    if(!this.authProvider.isLecturer()){
      this.presentAlertConfirm();
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!',
      message: 'You are not login as Lecturer,Please login.',
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
