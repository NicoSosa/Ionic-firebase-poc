import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InventoryLocalStorageService {

  constructor() { }

  public setLocalStorageInventory(inventoryForm: FormGroup, nameOfLocalStorageStore: string): any {
    inventoryForm.get('createdDate').setValue(Date.now());
    localStorage.setItem( nameOfLocalStorageStore, JSON.stringify(inventoryForm.value))
  }

  public getLocalStorageInventory(nameOfLocalStorageStore: string): void {
    const inventoryLS = JSON.parse(localStorage.getItem( nameOfLocalStorageStore));
    let dateControl= Date.now();
    if ( inventoryLS && inventoryLS.createdDate +  1000*60*60*30 >= dateControl) {
      return inventoryLS;
    } else {
      return null;
    }
  }

  public deleteLocalStorageInventory(nameOfLocalStorageStore: string) {
    localStorage.removeItem(nameOfLocalStorageStore);
  }
}
