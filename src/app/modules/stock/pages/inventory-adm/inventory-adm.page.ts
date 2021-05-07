import { Component, OnInit } from '@angular/core';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { StoreViewModel } from '../../../../models/stores/storeView.model';
import { Router } from '@angular/router';
import { InventoryService } from '../../../../services/inventory/inventory.service';
import { Observable } from 'rxjs/internal/Observable';
import { InventoryListItem, InventoryViewModel } from '../../../../models/inventories/inventoryView.Model';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';
import { ALERT_TYPE_OF_FORM_DATA } from '../../constants/inventoryConstants';

@Component({
  selector: 'app-inventory-adm',
  templateUrl: './inventory-adm.page.html',
  styleUrls: ['./inventory-adm.page.scss'],
})
export class InventoryAdmPage implements OnInit {
  public tittleToolbar: string = 'Inventory Adm';
  public storeList: StoreViewModel[];

  private selectedStore: StoreViewModel;
  public selectedChartInventory: InventoryViewModel;
  private inventories: InventoryViewModel[];

  chartOpen: boolean[] = [true,true,true];  

  constructor(private router: Router,
    private alertsService: AlertsService,
    private inventoryService: InventoryService,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.getStoresList();
    this.getInventories();
  }

  private getStoresList(): void {
    this.dbRequestsService.getStores().subscribe( dataList => {
      this.storeList =  dataList;
      this.selectedStore = dataList[0];
    })
  }

  private getInventories(): void {
    
    this.dbRequestsService.getInventorys().subscribe( data => {
      this.inventories = data;
      this.changeSelectedInventory(this.inventories[0].store);
    });
    // this.dbRequestsService.getLastInventories().forEach(
    //   (invObs, idx) => invObs.subscribe( data => this.inventories[idx] = data[0])
    // );
    // this.inventoryService.getInventories().subscribe( data => {this.inventories = data; console.log(data);});
  }


  segmentChanged(event): void{
    const selectedIndex = event.detail.value;
    this.selectedStore = this.storeList[selectedIndex];
    this.changeSelectedInventory(this.selectedStore.name);
  }

  changeSelectedInventory(store: string): void{
    const selectedInventory = this.inventories.find( inventory => store.toLowerCase() === inventory.store.toLowerCase()) 
    let productList = [];
    let utilitiesList =[];
    selectedInventory.products.map( list => { productList.push({
        category: list.category,
        items: list.items.map( ({name, quantity}) => { return { name, value: quantity }} )
      })
    });

    selectedInventory.utilities.map( list =>  { utilitiesList.push({
        category: list.category,
        items: list.items.map( ({name, quantity}) => { return { name, value: quantity }} )
      })
    })
    const produceList = selectedInventory.produces.map(  ({name, quantity}) => { return { name, value: quantity }} )

    this.selectedChartInventory = {
      ...selectedInventory,
      products: productList,
      utilities: utilitiesList,
      produces: produceList,
    }  
  }

  goToStockForm(): void {
    if(this.selectedStore.nameAbbreviation === 'RVS') {
      this.alertsService.selectOneOptionAlert(ALERT_TYPE_OF_FORM_DATA).then( alert => {
        alert.present();
        alert.onDidDismiss().then(value => {
          if(value.data.values === 0 && value.role === 'ok' ){
            this.router.navigateByUrl(`stock/inventory-form/${this.selectedStore.nameAbbreviation}`)
          }
          if(value.data.values === 1 && value.role === 'ok' ){
            this.router.navigateByUrl(`stock/daily-form/${this.selectedStore.nameAbbreviation}`)
          }
        })
      }
      );
    } else {
      this.router.navigateByUrl(`stock/inventory-form/${this.selectedStore.nameAbbreviation}`)
    }
  }

  toggleChart(idx: number){
    this.chartOpen[idx] = !this.chartOpen[idx];
  }
}
