import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreViewModel } from 'src/app/models/stores/storeView.model';
import { DbRequestsService } from 'src/app/services/db-requests.service';
import { AlertsService } from 'src/app/services/userMsgs/alerts.service';
import { STOCK_URL, VIEW_TITLE_NAME } from '../../constants/inventoryConstants';
import { first } from 'rxjs/operators';
import { InventoryDailyData } from 'src/app/models/inventories/inventoryDailyData.model';
@Component({
  selector: 'app-inventory-view-lasts-generated',
  templateUrl: './inventory-view-lasts-generated.page.html',
  styleUrls: ['./inventory-view-lasts-generated.page.scss'],
})
export class InventoryViewLastsGeneratedPage implements OnInit {
  public urlBack = STOCK_URL;

  public tittleToolbar: string;
  public inventoryList: InventoryDailyData[];
  private typeInventory: string;
  private selectedStore: StoreViewModel;

  constructor(private actRoute: ActivatedRoute,
    private alertsService: AlertsService,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.alertsService.presentLoading().then();
    this.initialProcess()
  }

  private async initialProcess() {
    await this.getStore();
    this.getInventories();
  }

  private getInventories(): void {
    const abvStore = this.selectedStore.nameAbbreviation;
    this.dbRequestsService.getLastDailyInventoryByAbvName(abvStore).subscribe( inventoryList => {
      this.inventoryList = inventoryList;
      this.alertsService.dismissLoading();
    });
  }

  private async getStore() {
    let nameAbv;
    await this.actRoute.params.pipe(first()).toPromise().then(params=> {
      nameAbv = params.id;
      this.typeInventory = params.invType;
    });

    await this.dbRequestsService.getStores().pipe(first()).toPromise().then( stores =>{
      this.selectedStore = stores.filter( store => store.nameAbbreviation === nameAbv)[0];
    });
    this.tittleToolbar = `${VIEW_TITLE_NAME}: ${this.selectedStore.name} - ${this.typeInventory}`;
  }
}
