import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthUser } from '../../models/auth/authUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUser: AuthUser;

  constructor(private afAuth: AngularFireAuth) {
    this.initialProcess();
  }

  private initialProcess(): void {
    this.authUser = null;
  }
  
  isLogedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe( map( user => {
      if (!user) {
        return false;
      } else {
        return true;
      }
    }));
  }

  authData(): Observable<AuthUser> {
    return this.afAuth.idTokenResult.pipe( map(user => {
      if( user ){
        this.authUser = {
          uid: user.claims.user_id,
          email:  user.claims.email, 
        }
        return this.authUser;
      }
      return null;
    }));
  }

  getAuthEmail(): string {
    if (this.authUser){
      return this.authUser.email;
    }
    return null;
  }

  async login(email: string, password: string): Promise<AuthUser> {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
  }

  async logout(): Promise<void> {
    this.authUser = null;
    await this.afAuth.signOut();
  }
}
