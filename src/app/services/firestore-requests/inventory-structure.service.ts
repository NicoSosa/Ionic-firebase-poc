import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryStructure, DBInventoryStructure } from '../../models/inventories/inventoryStructure.model';
import { INITIAL_INVENTORY_STRUCT, INITIAL_DAILY_INVENTORY_STRUCT } from '../../infrastructure/constants/inventoryStructure.constant';
import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../../models/auth/authUser.model';
import { StoresName } from '../../infrastructure/enum/stores.enum';

@Injectable({
  providedIn: 'root'
})
export class InventoryStructureService {
  private userInventory: Observable<any>;
  private weeklyInventoryStructureCollection: AngularFirestoreCollection<DBInventoryStructure>;
  private weeklyInventoryStructure: Observable<DBInventoryStructure[]>;
  private dailyInventoryStructureCollection: AngularFirestoreCollection<DBInventoryStructure>;
  private dailyInventoryStructure: Observable<DBInventoryStructure[]>;
  
  private constInventoryStructure: InventoryStructure = INITIAL_INVENTORY_STRUCT;
  private constDailyInventoryStructure: InventoryStructure = INITIAL_DAILY_INVENTORY_STRUCT;

  constructor(private afs: AngularFirestore,
    private authService: AuthService) { 
    this.setCollections();
  }

  private setCollections(): void {
    this.weeklyInventoryStructureCollection = this.afs.collection<any>('weeklyInventoryStructure', is => is.orderBy('dateUpdated','desc').limit(1))
    this.dailyInventoryStructureCollection = this.afs.collection<any>('dailyInventoryStructure', is => is.orderBy('dateUpdated','desc').limit(1))
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

  getWeeklyStructure(): Observable<InventoryStructure> {
    // return of(this.constInventoryStructure);
    if( !this.weeklyInventoryStructure){
      this.weeklyInventoryStructure = this.weeklyInventoryStructureCollection.valueChanges();
    }
    return this.weeklyInventoryStructure.pipe( map( data => data[0]));
  }
  
  getDailyStructure(): Observable<InventoryStructure> {
    // return of(this.constDailyInventoryStructure);
    if( !this.dailyInventoryStructure) {
      this.dailyInventoryStructure = this.dailyInventoryStructureCollection.valueChanges();
    }
    return this.dailyInventoryStructure.pipe( map( data => data[0]));
  }

  async updateWeekStructure(inventoryStructure: InventoryStructure) {
    const dbInventoryStructure: DBInventoryStructure = {
      ...inventoryStructure,
      dateUpdated: Date.now(),
      userUpdated: this.authService.getAuthEmail()
    }
    return this.weeklyInventoryStructureCollection.add(dbInventoryStructure)
  }

  async updateDailyStructure(inventoryStructure: InventoryStructure) {
    const dbInventoryStructure: DBInventoryStructure = {
      ...inventoryStructure,
      dateUpdated: Date.now(),
      userUpdated: this.authService.getAuthEmail()
    }
    return this.dailyInventoryStructureCollection.add(dbInventoryStructure)
  }

  getLastWeeklyInventoryStructure(store: StoresName): Observable<InventoryStructure> {
    const InventoryStructure = this.afs.collection<any>('weeklyInventory',inv => inv.orderBy('dateUpdated','desc').where('store','==', store).limit(1)).get();
    return InventoryStructure.pipe( map( data => data[0]));
  }

  getLastDailyInventoryStructure(store: StoresName): Observable<InventoryStructure> {
    const InventoryStructure = this.afs.collection<any>('dailyInventory',inv => inv.orderBy('dateUpdated','desc').where('store','==', store).limit(1)).get();
    return InventoryStructure.pipe( map( data => data[0]));
  }

}
