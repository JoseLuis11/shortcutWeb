import { Router } from '@angular/router';
import { Workplace } from './../model/workplace.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';


@Component({
    selector: 'owner-homepage',
    templateUrl: './owner_homepage.component.html',
})

export class OwnerHomepageComponent {

    ownerId: any;
    workplaces: Observable<{}[]>;
    filteredWorkplaces: any;
    appointments: Observable<any[]>;


    constructor(private router: Router, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
        this.afAuth.authState.subscribe(data => {
            if (data == null) {
                this.router.navigate(['../login-owner']);
            } else {
                console.log(data.uid);
            }
        });

        this.loadWorkplaces();
        this.loadAppointments();
    }

    loadWorkplaces() {
        this.workplaces = this.afDb.list('workplaces').valueChanges();

        this.filteredWorkplaces = this.workplaces.map(workplaces => {
            return workplaces.filter((workplace: Workplace) => workplace.ownerId == this.ownerId);
        });
    }

    loadAppointments() {
        this.appointments = this.afDb.list('appointments').valueChanges();
    }

    showEmployees(id) {
        this.router.navigate(['/employees', id]);
    }

    onDeleteAppointment(id){
        console.log(id);

        const customers = this.afDb.object(`/appointments/${id}`);
        customers.remove().then(()=>{
            console.log("Eliminado con éxito")
        }).catch(error =>{
            console.log(error);
        });
    }
}