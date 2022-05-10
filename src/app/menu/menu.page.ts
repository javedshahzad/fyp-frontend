import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  // @ViewChild('Nav') nav: NavController;
  pages =[];
  userName = '';

  constructor(public navCtrl: NavController,
    private authProvider: AuthProvider,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if (this.authProvider.isAdmin()){
      this.pages = [
        { title: 'Admin Dashboard', page:'/admin', icon: 'home',},
        { title: 'Admin Profile', page:'/profile'},
        { title: 'Manage Account', page:'/admin/manage_account', icon: 'home',},
      ];
      this.openPage('AdminPage');
    } else if(this.authProvider.isLecturer()){
      this.pages = [
        { title: 'Lecturer Dashboard', page:'/lecturer', icon: 'home'},
        { title: 'Lecturer Profile', page:'/profile'},
      ];
      this.openPage('LecturerPage');
    }else if(this.authProvider.isStudent()){
      this.pages = [
        { title: 'Student Dashboard', page:'/student', icon: 'home'},
        { title: 'Student Profile', page:'/profile'},
      ];
      this.openPage('StudentPage');
    }
    this.userName = this.authProvider.currentUser.userName;
  }

  openPage(page){
    this.router.navigateByUrl(page);
  }

  logout(){
    this.authProvider.logout();
    this.router.navigateByUrl('/login');
  }

  ionViewCanEnter(){
    return this.authProvider.isLoggedIn();
  }
}
