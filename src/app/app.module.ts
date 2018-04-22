import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

//components
import { OwnerHomepageComponent, RegisterEmployeeComponent, RegisterWorkplaceComponent, LoginOwnerComponent, RegisterOwnerComponent } from './index.pages'
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
    RegisterOwnerComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: 'owner-home', component: OwnerHomepageComponent },
      { path: 'register-employee', component: RegisterEmployeeComponent },
      { path: 'register-workplace', component: RegisterWorkplaceComponent },
      { path: 'login-owner', component: LoginOwnerComponent },
      { path: 'register-owner', component: RegisterOwnerComponent },
      //{ path: '', redirectTo: 'login-owner'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
