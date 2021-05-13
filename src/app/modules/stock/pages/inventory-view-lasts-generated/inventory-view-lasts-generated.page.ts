import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreViewModel } from 'src/app/models/stores/storeView.model';
import { DbRequestsService } from 'src/app/services/db-requests.service';
import { AlertsService } from 'src/app/services/userMsgs/alerts.service';
import { DAILY_INVENTORY_TITLE_NAME, STOCK_URL } from '../../constants/inventoryConstants';
@Component({
  selector: 'app-inventory-view-lasts-generated',
  templateUrl: './inventory-view-lasts-generated.page.html',
  styleUrls: ['./inventory-view-lasts-generated.page.scss'],
})
export class InventoryViewLastsGeneratedPage implements OnInit {
  private invTitleName = DAILY_INVENTORY_TITLE_NAME;
  public urlBack = STOCK_URL;

  public tittleToolbar: string;
  // public storeList: StoreViewModel[];
  private selectedStore: StoreViewModel;

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private alertsService: AlertsService,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.alertsService.presentLoading().then();
    this.getInventories();
    // this.getStore();
  }

  private getInventories(): void {}
//   private async getStores() {
//     await this.actRoute.params.subscribe( params => {
//       this.storeInv.setValue(params.id);
//     });

//     this.dbRequestsService.getStores().subscribe( stores => {
//       this.storeList = stores;
//       const storeAbv = this.storeInv.value;
//       this.selectedStore = this.storeList.filter( store => store.nameAbbreviation === storeAbv)[0];
//       this.storeNameInv.setValue(this.selectedStore.name);
//       this.invTitleName = ` ${this.selectedStore.name}: ${this.invTitleName}`;
      
//       this.tittleToolbar = `${this.invTitleName} - ${this.inventoryStructure? this.inventoryStructure.pages[0].name : ''}`;
//     });
//   }
}
