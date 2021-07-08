import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUser } from '../../models/auth/authUser.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryUsersService {
  private userInventory: Observable<any>;

  constructor(private afs: AngularFirestore) { 
  }

  getUserFirestore(uid: string): Observable<AuthUser>{
    this.userInventory = this.afs.collection<AuthUser>('userInventory').doc(uid).get();
    return this.userInventory.pipe( map(dbUserData => {
      if (dbUserData) {
        return {...dbUserData.data()}
      }
      return null;
    }));
  }
}
