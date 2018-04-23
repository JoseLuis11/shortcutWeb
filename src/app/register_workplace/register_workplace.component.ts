import { Router } from '@angular/router';
import { Workplace } from './../model/workplace.model';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'register-workplace',
  templateUrl: './register_workplace.component.html',
})
export class RegisterWorkplaceComponent {

  ownerId: any;
  workplace = {} as Workplace;
  workplaces$: AngularFireList<any[]>;


  constructor(private router: Router, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private af: AngularFireDatabase) {
    this.workplace.address = '';
    this.workplace.name = '';
    this.workplace.phoneNumber = '';

    this.afAuth.authState.subscribe(data => {
      if (data == null) {
        this.router.navigate(['../login-owner']);
      } else {
        console.log(data.uid);
      }
    });
  }

  registerWorkplace() {
    const workplacesRef = this.af.list('/workplaces');
    workplacesRef.push(this.workplace).then(ref=>{
      this.workplace.k = ref.key;
      this.afDb.object(`workplaces/${ref.key}`).set(this.workplace).then(() => {
      }).catch(error => {
        console.log(error);
      })  
    });
  }

}