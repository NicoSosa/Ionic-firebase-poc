import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreViewModel } from '../models/stores/storeView.model';
import { InventoryViewModel } from '../models/inventories/inventoryView.Model';
import { InventoryStructure, DBInventoryStructure } from '../models/inventories/inventoryStructure.model';
import { INITIAL_INVENTORY_STRUCT, INITIAL_DAILY_INVENTORY_STRUCT } from '../infrastructure/constants/inventoryStructure.constant';
import { AuthService } from './auth/auth.service';
import { AuthUser } from '../models/auth/authUser.model';
import { StoresAbv, StoresAbvDescript } from '../infrastructure/enum/storesAbv.enum';
import { InventoryDailyData } from '../models/inventories/inventoryDailyData.model';


@Injectable({
  providedIn: 'root'
})
export class DbRequestsService {
  private userInventory: Observable<any>;
  private weeklyInventoryCollection: AngularFirestoreCollection<any>;
  private weeklyInventories: Observable<any>;
  private dailyInventoryCollection: AngularFirestoreCollection<any>;
  private dailyInventories: Observable<any>;
  private weeklyInventoryStructureCollection: AngularFirestoreCollection<DBInventoryStructure>;
  private weeklyInventoryStructure: Observable<DBInventoryStructure[]>;
  private dailyInventoryStructureCollection: AngularFirestoreCollection<DBInventoryStructure>;
  private dailyInventoryStructure: Observable<DBInventoryStructure[]>;
  
  private constInventoryStructure: InventoryStructure = INITIAL_INVENTORY_STRUCT;
  private constDailyInventoryStructure: InventoryStructure = INITIAL_DAILY_INVENTORY_STRUCT;

  private storeList: StoreViewModel[] = [
    {
      id: 'c556b629-e72b-4837-b481-349352afa870',
      name: 'Riverside',
      nameAbbreviation: 'RVS'
    },
    {
      id: '83ed22cb-9166-437f-8eb0-c5e536e24303',
      name: 'La Grange',
      nameAbbreviation: 'LGE'
    },
    {
      id: '9ce6aa2b-9e35-4f14-89eb-0215890afb12',
      name: 'Homewood',
      nameAbbreviation: 'HWD'
    },
  ]


  constructor(private afs: AngularFirestore,
    private authService: AuthService) { 
    this.setCollections();
  }

  private setCollections(): void {
    this.weeklyInventoryCollection = this.afs.collection<any>('weeklyInventory',inv => inv.orderBy('createdDate','desc').orderBy('store','desc').limit(1));
    this.dailyInventoryCollection = this.afs.collection<any>('dailyInventory',inv => inv.orderBy('createdDate','desc').limit(1));
    this.weeklyInventoryStructureCollection = this.afs.collection<any>('weeklyInventoryStructure', is => is.orderBy('dateUpdated','desc').limit(1))
    this.dailyInventoryStructureCollection = this.afs.collection<any>('dailyInventoryStructure', is => is.orderBy('dateUpdated','desc').limit(1))
  }

  getStores(): Observable<StoreViewModel[]> {
    const storeListObservable$ = of(this.storeList);
    return storeListObservable$;
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

  getLastWeeklyInventoryByAbvName(abvString: string): Observable<InventoryViewModel> {
    const ArrayObservableOfInventories = this.afs.collection<any>('weeklyInventory',inv => inv.orderBy('createdDate','desc').where('store','==', abvString).limit(1)).valueChanges();
    return ArrayObservableOfInventories.pipe( map( data => data[0]));
  }

  getLastDailyInventoryByAbvName(): Observable<InventoryDailyData> {
    return this.dailyInventoryCollection.valueChanges().pipe( map (data => data[0]));
  }

  async setNewWeeklyInventory(inventory: InventoryViewModel ) {
    inventory.createdUser = this.authService.getAuthEmail();
    inventory.createdDate = Date.now();
    inventory.closedDate = new Date();
    return this.weeklyInventoryCollection.add(inventory);
  }

  async setNewDailyInventory(inventory: InventoryDailyData ) {
    inventory.createdUser = this.authService.getAuthEmail();
    inventory.createdDate = Date.now();
    inventory.closedDate = new Date();
    return this.dailyInventoryCollection.add(inventory);
  }

}
