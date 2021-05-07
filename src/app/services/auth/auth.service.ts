import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthUser } from '../../models/auth/authUser.model';
import { ToastsService } from 'src/app/services/userMsgs/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private toastsService: ToastsService) {}
  
  isLogedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe( map( user => {
      if (!user) {
        return false;
      } else {
        return true;
      }
    }));
  }

  userData(): Observable<AuthUser> {
    return this.afAuth.idTokenResult.pipe( map( idTRMap => {
      if (!idTRMap) {
        return null
      }

      const claims = { ...idTRMap.claims };
      const authUserData: AuthUser = {
        uid: claims.user_id,
        displayName: claims.name,
        email: claims.email,
        emailVerified: claims.email_verified,

      }
      return authUserData;
    }));
  }

  async login(email: string, password: string): Promise<AuthUser> {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);

      return user;
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }
}
