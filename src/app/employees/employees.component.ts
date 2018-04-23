import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent {

  constructor(private afAuth: AngularFireAuth, private router:Router){
    this.afAuth.authState.subscribe(data => {
      if (data == null) {
        this.router.navigate(['../login-owner']);
      } else {
        console.log(data.uid);
      }
    });
  }
  
  
}