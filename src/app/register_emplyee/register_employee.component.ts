import { Employee } from './../model/employee.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Workplace } from './../model/workplace.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'register-employee',
  templateUrl: './register_employee.component.html',
})
export class RegisterEmployeeComponent {

  workplaces: Observable<{}[]>;
  ownerId: any;
  filteredWorkplaces: any;
  employee = {} as Employee;
  workplace : Workplace;
  workplacetRef: AngularFireObject<any>;;

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.employee.firstName = '';
    this.employee.lastName = '';
    this.employee.phoneNumber = '';
    this.employee.email = '';

    this.afAuth.authState.subscribe(data => {
      this.ownerId = data.uid;
      console.log(data.uid);
    });

    this.workplaces = afDb.list('workplaces').valueChanges();

    this.filteredWorkplaces = this.workplaces.map(workplaces => {
      return workplaces.filter((workplace: Workplace) => workplace.ownerId === this.ownerId);
    });

  }

  registerEmployee() {
    const employeesRef = this.afDb.list(`/workplaces/${this.workplace.k}/employees`);

    employeesRef.push(this.employee).then( ref=>{
      this.afDb.object(`workplaces/${this.workplace.k}/employees/${ref.key}`).set(this.employee).then(() => {
      }).catch(error => {
        console.log(error);
      })  
    })
    
  }

}