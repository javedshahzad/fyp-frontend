import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileName = '';
  majorName = '';
  email= '';
  userName;


  constructor( private authProvider: AuthProvider,private nav: NavController) { }

  ngOnInit() {
    this.profileName = localStorage.getItem('profileName');
    this.email = localStorage.getItem('email');
    this.userName= localStorage.getItem('userName');

  }
  changePassword(){
    this.nav.navigateForward('changepassword');
  }
}
