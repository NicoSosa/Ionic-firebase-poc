import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryViewModel } from '../../models/inventories/inventoryView.Model';
import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../../models/auth/authUser.model';
import { InventoryDailyData } from '../../models/inventories/inventoryDailyData.model';


@Injectable({
  providedIn: 'root'
})
export class InventoryReportService {
  private userInventory: Observable<any>;
  private weeklyInventoryCollection: AngularFirestoreCollection<any>;
  private weeklyInventories: Observable<any>;
  private dailyInventoryCollection: AngularFirestoreCollection<any>;
  private dailyInventories: Observable<InventoryDailyData[]>;
  
  constructor(private afs: AngularFirestore,
    private authService: AuthService) { 
    this.setCollections();
  }

  private setCollections(): void {
    this.weeklyInventoryCollection = this.afs.collection<any>('weeklyInventory',inv => inv.orderBy('createdDate','desc').limit(1));
    this.dailyInventoryCollection = this.afs.collection<any>('dailyInventory',inv => inv.orderBy('closedDate','desc').limit(1));
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

  getLastWeeklyInventoryByAbvName(abvString: string): Observable<InventoryViewModel> {
    const ArrayObservableOfInventories = this.afs.collection<any>('weeklyInventory',inv => inv.orderBy('createdDate','desc').where('store','==', abvString).limit(1)).valueChanges();
    return ArrayObservableOfInventories.pipe( map( data => data[0]));
  }

  getLastDailyInventoryByAbvName(abvString: string): Observable<InventoryDailyData[]> {
    if (!this.dailyInventories) {
      this.dailyInventories = this.afs.collection<any>('dailyInventory',inv => inv.orderBy('closedDate','desc').where('store','==', abvString).limit(3)).valueChanges();
    }
    return this.dailyInventories;
  }

  async setNewWeeklyInventory(inventory: InventoryViewModel ) {
    inventory.createdUser = this.authService.getAuthEmail();
    inventory.createdDate = Date.now();
    inventory.closedDate = new Date();
    return this.weeklyInventoryCollection.add(inventory);
  }

  async setNewDailyInventory(inventory: InventoryDailyData ) {
    inventory.createdUser = this.authService.getAuthEmail();
    inventory.closedDate = new Date();
    return this.dailyInventoryCollection.add(inventory);
  }

}
