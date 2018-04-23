import { AuthenticationService } from './../service/authentication.service';
import { UserModel } from './../model/user.model';
import { Component } from '@angular/core';
import { Owner } from '../model/owner.model';
import { Router } from '@angular/router';

@Component({
    selector: 'login-owner',
    templateUrl: './login_owner.component.html',
    providers: [AuthenticationService]
})
export class LoginOwnerComponent {

    user = {} as UserModel;

    constructor(private router:Router,private authService: AuthenticationService) {
        this.user.email = "";
        this.user.password = "";
    }

    login() {
        //poner loading
        /*this.authService.signInWithEmailAndPassword(this.user).then(result => {
          console.log("Ingresado con éxito");
          this.router.navigate(['../owner-homepage']);
        }).catch(error => {
          //loading.dismiss();
          if (error.message.includes("There is no user record corresponding to this identifier")) {
            console.log('Usuario inexistente.');
          } else if (error.message.includes("The password is invalid")) {
            console.log('Contraseña incorrecta.');
          } else if (error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")){
            console.log('No hay conexión a internet.');
          } else {
            console.log('Ha ocurrido un error inesperado. Por favor intente nuevamente.');
          }
          console.log(error);
        });*/

        this.authService.signInWithEmailAndPassword(this.user).then(result => {
          console.log("Ingresado con éxito");
          this.router.navigate(['../owner-homepage']);
          
        }).catch(error => {
          //loading.dismiss();
          if (error.message.includes("There is no user record corresponding to this identifier")) {
            console.log('Usuario inexistente.');
          } else if (error.message.includes("The password is invalid")) {
            console.log('Contraseña incorrecta.');
          } else if (error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")){
            console.log('No hay conexión a internet.');
          } else {
            console.log('Ha ocurrido un error inesperado. Por favor intente nuevamente.');
          }
          console.log(error);
    
        });
      }
}