import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

//components
import { OwnerHomepageComponent, RegisterEmployeeComponent, RegisterWorkplaceComponent, LoginOwnerComponent, RegisterOwnerComponent,  EmployeesComponent, PresentationComponent } from './index.pages'
import { AppComponent } from './app.component';

//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from './../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  declarations: [
    AppComponent,
    OwnerHomepageComponent,
    RegisterEmployeeComponent,
    RegisterWorkplaceComponent,
    LoginOwnerComponent,
    RegisterOwnerComponent,
    EmployeesComponent,
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'owner-homepage', component: OwnerHomepageComponent },
      { path: 'register-employee', component: RegisterEmployeeComponent },
      { path: 'register-workplace', component: RegisterWorkplaceComponent },
      { path: 'login-owner', component: LoginOwnerComponent },
      { path: 'register-owner', component: RegisterOwnerComponent },
      { path: 'presentation', component: PresentationComponent },
      { path: 'employees/:id', component: EmployeesComponent },
      { path: '', redirectTo:'login-owner', pathMatch:'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
