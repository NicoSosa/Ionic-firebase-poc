import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventoryCollection: AngularFirestoreCollection<any>;
  private inventories: Observable<any>;

  constructor(private afs: AngularFirestore) { 
    this.inventoryCollection = afs.collection<any>('inventories',inv => inv.orderBy('createdDate','desc').where('store','==','Riverside').limit(1));
    // this.inventoryCollection = afs.collection<any>('inventories',inv => inv.orderBy('createdDate','desc').limit(1));
  }
  
  public getInventories(): Observable<any> {
    this.inventories = this.inventoryCollection.valueChanges();
    return this.inventories;
  } 
}
