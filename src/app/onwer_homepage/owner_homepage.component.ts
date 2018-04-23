import { Workplace } from './../model/workplace.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'owner-homepage',
    templateUrl: './owner_homepage.component.html',
})

export class OwnerHomepageComponent {

    ownerId: any;
    workplaces: Observable<{}[]>;
    filteredWorkplaces: any;
    clients: any;
    appointments: any;

    constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
        this.afAuth.authState.subscribe(data => {
            this.ownerId = data.uid;
            console.log(data.uid);
        });

        this.loadWorkplaces();
        this.loadAppointments();
    }

    loadWorkplaces() {
        this.workplaces = this.afDb.list('workplaces').valueChanges();

        this.filteredWorkplaces = this.workplaces.map(workplaces => {
            return workplaces.filter((workplace: Workplace) => workplace.ownerId === this.ownerId);
        });
    }

    loadAppointments(){
        this.clients = this.afDb.list('clients').valueChanges();

        this.clients.forEach(element => {
            this.appointments.push(element.appointment);
        });

        console.log(this.appointments);
    }
}