import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from './service/authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {

  ownerRef;
  owner;
  isLogged: boolean = false;

  constructor(private afDb: AngularFireDatabase, private router: Router, private afAuth: AngularFireAuth, private authService: AuthenticationService) {
    this.afAuth.authState.subscribe(data => {
      if (data == null) {
        this.isLogged = false;
      } else {
        this.isLogged = true;
        this.ownerRef = this.afDb.object(`/owners/${data.uid}`);
      this.owner = this.ownerRef.valueChanges();
      }
    });
  }

  logOut() {
    this.authService.signOut();
    this.router.navigate(['../login-owner']);
  }

  goHome(){
    this.router.navigate(['../owner-homepage']);
  }

  goRegisterWorkplace() {
    this.router.navigate(['../register-workplace']);
  }
  goRegisterEmployee() {
    this.router.navigate(['../register-employee']);
  }
  goLogin() {
    this.router.navigate(['../login-owner']);
  }
  goRegister() {
    this.router.navigate(['../register-owner']);
  }

  goPresentation(){
    this.router.navigate(['../presentation']);
  }

}
