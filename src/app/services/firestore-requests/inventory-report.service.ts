import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryViewModel } from '../../models/inventories/inventoryView.Model';
import { AuthService } from '../auth/auth.service';
import { InventoryDailyData } from '../../models/inventories/inventoryDailyData.model';
import { StoresName } from 'src/app/infrastructure/enum/stores.enum';
import { InventoryWeeklyData } from 'src/app/models/inventories/inventoryWeeklyData.model';


@Injectable({
  providedIn: 'root'
})
export class InventoryReportService {
  private weeklyInventoryCollection: AngularFirestoreCollection<any>;
  private weeklyInventories: Observable<InventoryWeeklyData[]>;
  private dailyInventoryCollection: AngularFirestoreCollection<any>;
  private dailyInventories: Observable<InventoryDailyData[]>;
  
  constructor(private afs: AngularFirestore,
    private authService: AuthService) { 
    this.setCollections();
  }

  private setCollections(): void {
    this.weeklyInventoryCollection = this.afs.collection<any>('weeklyInventory',inv => inv.orderBy('closedDate','desc').limit(1));
    this.dailyInventoryCollection = this.afs.collection<any>('dailyInventory',inv => inv.orderBy('closedDate','desc').limit(1));
  }

  getLastWeeklyInventoryByAbvName(store: StoresName): Observable<InventoryWeeklyData[]> {
    this.weeklyInventories = this.afs.collection<any>('weeklyInventory',inv => inv.orderBy('closedDate','desc').where('store','==', store).limit(3)).valueChanges();
    return this.weeklyInventories;
  }

  getLastDailyInventoryByAbvName(store: StoresName): Observable<InventoryDailyData[]> {
    this.dailyInventories = this.afs.collection<any>('dailyInventory',inv => inv.orderBy('closedDate','desc').where('store','==', store).limit(3)).valueChanges();
    return this.dailyInventories;
  }

  async setNewWeeklyInventory(inventory: InventoryWeeklyData ) {
    inventory.createdUser = this.authService.getAuthEmail();
    inventory.closedDate = new Date();
    return this.weeklyInventoryCollection.add(inventory);
  }

  async setNewDailyInventory(inventory: InventoryDailyData ) {
    inventory.createdUser = this.authService.getAuthEmail();
    inventory.closedDate = new Date();
    return this.dailyInventoryCollection.add(inventory);
  }

}
