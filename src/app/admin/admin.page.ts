import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private authProvider: AuthProvider,
    private menu: MenuController,
  ) {
  }

  ngOnInit() {
    if(!this.authProvider.isAdmin()){
      this.presentAlertConfirm();
    }
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!',
      message: 'You are not login as admin,Please login.',
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
