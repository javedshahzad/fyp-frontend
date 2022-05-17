import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public profileName = '';
  public majorName = '';
  public email= '';

  constructor( private authProvider: AuthProvider) { }

  ngOnInit() {
    this.profileName = localStorage.profileName;

  }

}
