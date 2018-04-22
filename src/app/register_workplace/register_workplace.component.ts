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


  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private af: AngularFireDatabase) {
    this.workplace.address = '';
    this.workplace.name = '';
    this.workplace.phoneNumber = '';
    //this.workplaces$ = this.af.list('/workplaces').push;


    this.afAuth.authState.subscribe(data => {
      this.workplace.ownerId = data.uid;
      console.log(data.uid);
      //this.product = this.productRef.valueChanges();
    });
  }

  registerWorkplace() {

    const customersRef = this.af.list('/workplaces');

    customersRef.push(this.workplace);
    /*
    this.workplaces$.child(this.workplace).then(() => {
        
      this.notify(this.product.name, this.product.expiredDate);
      this.navCtrl.pop();
    }).catch(error => {
      this.showToast("Algo salió mal, intentalo de nuevo.");
      console.log(error);
    });*/
  }



}