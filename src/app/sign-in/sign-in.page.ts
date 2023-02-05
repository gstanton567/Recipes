import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss']
})
export class SignInPage implements OnInit {
  email: string = ""
  abc: string = ""
  public password: string = ""
  constructor(
    public authService: AuthService, 
    public navController: NavController
  ) { }
  ngOnInit() { 
    this.email = ''
    this.password = ''
  }

  signIn() {
    this.authService.SignIn(this.email, this.password).then(res => {

    })
  }
}