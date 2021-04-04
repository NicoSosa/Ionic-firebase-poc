import { Component, OnInit } from '@angular/core';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { StoreViewModel } from '../../../../models/stores/storeView.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-adm',
  templateUrl: './inventory-adm.page.html',
  styleUrls: ['./inventory-adm.page.scss'],
})
export class InventoryAdmPage implements OnInit {
  public tittleToolbar: string = 'Inventory Adm';
  public storeList: StoreViewModel[];

  private selectedStore: StoreViewModel;

  constructor(private router: Router,
    private dbRequestsService: DbRequestsService) { }

  ngOnInit() {
    this.getStoresList();
  }

  private getStoresList(): void {
    this.dbRequestsService.getStores().subscribe( dataList => {
      this.storeList =  dataList;
      this.selectedStore = dataList[0];
    })
  }

  segmentChanged(event): void{
    const selectedIndex = event.detail.value;
    this.selectedStore = this.storeList[selectedIndex];
  }

  goToStockForm(): void {
    this.router.navigateByUrl(`stock/inventory-form/${this.selectedStore.nameAbbreviation}`)
  }
}
