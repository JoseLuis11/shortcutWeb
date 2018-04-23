import { Owner } from './../model/owner.model';
import { Injectable } from '@angular/core';

//angular fire imports
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//firebase authentication
import { User } from 'firebase/app'
import { UserModel } from '../model/user.model';


@Injectable()
export class AuthenticationService {

  user: User;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    afAuth.authState.subscribe((user: User) => {
      this.user = user;
    });
  }

  get authenticated(): boolean {
    return this.user != null;
  }

  signInWithEmailAndPassword(userModel: UserModel): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(userModel.email, userModel.password);
  }

  createUserWithEmailAndPassword(userModel: UserModel): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(userModel.email, userModel.password);
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  createOwner(owner: Owner) {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`owners/${auth.uid}`).set(owner).then(() => {
      }).catch(error => {
        console.log(error);
      })
    });
  }

  resetPassword(email: string): Promise<any> {

    return this.afAuth.auth.sendPasswordResetEmail(email);

  }

  private login: boolean = false;

  isLogged() {
    return this.login;
  }

  changeState(): void {
    if (this.login == false) {
      this.login = true
    } else {
      this.login = false;

    }
  }

}