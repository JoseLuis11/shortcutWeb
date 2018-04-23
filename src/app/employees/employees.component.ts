import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { constants } from 'os';


@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent {

  id: any;
  private sub: any;
  employees: Observable<any[]>;
  workplace: any;
  workplaceRef: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute, private afDb: AngularFireDatabase) {
    this.afAuth.authState.subscribe(data => {
      if (data == null) {
        this.router.navigate(['../login-owner']);
      } else {
        console.log(data.uid);
      }
    });


  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];


    if (this.id == undefined) {
      this.router.navigate(['../login-owner']);
    } else {
      console.log(this.id);
      this.workplaceRef = this.afDb.object(`/workplaces/${this.id}`);
      this.workplace = this.workplaceRef.valueChanges();
      this.employees = this.afDb.list(`workplaces/${this.id}/employees`).valueChanges();
    }
  }


}