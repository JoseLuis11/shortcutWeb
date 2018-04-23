import { AuthenticationService } from './../service/authentication.service';
import { Owner } from './../model/owner.model';
import { Component } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'register-owner',
  templateUrl: './register_owner.component.html',
  providers: [AuthenticationService]
})
export class RegisterOwnerComponent {

  owner = {} as Owner;
  user = {} as UserModel;
  password: string;

  constructor(private router: Router, private authService: AuthenticationService){

  }

  ngOnInit() {
    this.user.email = '';
    this.user.password = '';
    this.password = '';
  }

  addOwner() {
    console.log(this.user.email);

    if (this.user.password != this.password) {
      console.log("Las contraseñas no coinciden. Inténtelo de nuevo.")
      console.log(this.user.password, this.password);
    } else {
      this.authService.createUserWithEmailAndPassword(this.user).then(result => {
        this.authService.createOwner(this.owner);
        console.log("Registrado con éxito.")

        this.router.navigate(['../login-owner']);
        

      }).catch(error => {
        if (error.message.includes("The email address is badly formatted")) {
          console.log("El email tiene un formato erroneo.");
        } else if (error.message.includes("The email address is already in use by another account.")) {
          console.log("Este email está en uso actualmente.");

        } else if (error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")) {
          console.log('No hay conexión a internet.');
        } else {
          console.log(error);
          console.log("Ha ocurrido un error inesperado. Por favor intente nuevamente.")

        }
      });
    }

  }


  
}