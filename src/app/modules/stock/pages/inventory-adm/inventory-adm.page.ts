import { Component, OnInit } from '@angular/core';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { StoreViewModel } from '../../../../models/stores/storeView.model';
import { Router } from '@angular/router';
import { InventoryViewModel } from '../../../../models/inventories/inventoryView.Model';
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
  public weeklyInventory: InventoryViewModel;
  public dailyInventory: InventoryViewModel;

  chartOpen: boolean[] = [true,true,true];  

  constructor(private router: Router,
    private alertsService: AlertsService,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.getStoresList();
  }

  private getStoresList(): void {
    this.dbRequestsService.getStores().subscribe( dataList => {
      if (dataList) {
        this.storeList =  dataList;
        this.selectedStore = dataList[0];
        this.changeSelectedInventory('RVS');
      }
    })
  }

  segmentChanged(event): void{
    const selectedIndex = event.detail.value;
    this.selectedStore = this.storeList[selectedIndex];
    this.changeSelectedInventory(this.selectedStore.nameAbbreviation);
  }

  private changeSelectedInventory(abv: string): void{
    if( abv === 'RVS') {
      this.dbRequestsService.getLastDailyInventoryByAbvName().subscribe( inv => {
        this.dailyInventory = inv? inv : null;
      });
    }else {
      this.dailyInventory = null;
    }
    this.dbRequestsService.getLastWeeklyInventoryByAbvName(abv).subscribe(inv => {
      this.weeklyInventory = inv ? inv : null;
    });
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
}
