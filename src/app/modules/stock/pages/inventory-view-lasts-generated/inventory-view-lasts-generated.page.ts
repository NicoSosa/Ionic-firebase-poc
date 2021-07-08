import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/services/userMsgs/alerts.service';
import { STOCK_URL, VIEW_TITLE_NAME } from '../../constants/inventoryConstants';
import { first } from 'rxjs/operators';
import { InventoryDailyData } from 'src/app/models/inventories/inventoryDailyData.model';
import { StoreAbv, StoreName, StoresName } from 'src/app/infrastructure/enum/stores.enum';
import { StoresNameDescript } from '../../../../infrastructure/enum/stores.enum';
import { InventoryReportService } from 'src/app/services/firestore-requests/inventory-report.service';
import { InventoryWeeklyData } from 'src/app/models/inventories/inventoryWeeklyData.model';
@Component({
  selector: 'app-inventory-view-lasts-generated',
  templateUrl: './inventory-view-lasts-generated.page.html',
  styleUrls: ['./inventory-view-lasts-generated.page.scss'],
})
export class InventoryViewLastsGeneratedPage implements OnInit {
  public urlBack = STOCK_URL;

  public tittleToolbar: string;
  public inventoryList: InventoryDailyData[] | InventoryWeeklyData[];
  public typeInventory: string;
  private selectedStore: StoresName;
  private storeAbv: StoreAbv;
  private storeName: StoreName;

  constructor(private actRoute: ActivatedRoute,
    private alertsService: AlertsService,
    private inventoryReportService: InventoryReportService) { }

  ngOnInit() {
    this.alertsService.presentLoading().then();
    this.initialProcess()
  }

  private async initialProcess() {
    await this.getStore();
    this.getInventories();
  }

  private getInventories(): void {
    if(this.typeInventory === 'weekly') {
      this.inventoryReportService.getLastWeeklyInventoryByAbvName(this.selectedStore).subscribe( inventoryList => {
        this.inventoryList = inventoryList;
        this.alertsService.dismissLoading();
      });
    }

    if(this.typeInventory === 'daily') {
      this.inventoryReportService.getLastDailyInventoryByAbvName(this.selectedStore).subscribe( inventoryList => {
        this.inventoryList = inventoryList;
        this.alertsService.dismissLoading();
      });
    }

  }

  private async getStore() {
    await this.actRoute.params.pipe(first()).toPromise().then(params=> {
      this.storeAbv = params.id;
      this.typeInventory = params.invType;
      this.selectedStore = StoresName[this.storeAbv];
      this.storeName = StoresNameDescript.get(this.selectedStore);
      this.tittleToolbar = `${VIEW_TITLE_NAME}: ${this.storeName} - ${this.typeInventory}`;
    });
  }
}
