import { Component, OnInit } from '@angular/core';
import { DbRequestsService } from '../../../../services/db-requests.service';
import { StoreViewModel } from '../../../../models/stores/storeView.model';
import { Router } from '@angular/router';
import { InventoryViewModel } from '../../../../models/inventories/inventoryView.Model';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';
import { ALERT_TYPE_OF_FORM_DATA } from '../../constants/inventoryConstants';
import { AuthService } from '../../../../services/auth/auth.service';
import { first } from 'rxjs/operators';
import { InventoryDailyData } from '../../../../models/inventories/inventoryDailyData.model';
import { FormType } from '../../../../infrastructure/enum/formType.enum';

@Component({
  selector: 'app-inventory-adm',
  templateUrl: './inventory-adm.page.html',
  styleUrls: ['./inventory-adm.page.scss'],
})
export class InventoryAdmPage implements OnInit {
  public tittleToolbar: string = 'Inventory Adm';
  public storeList: StoreViewModel[];
  public formType = FormType;

  private selectedStore: StoreViewModel;
  public weeklyInventory: InventoryViewModel;
  public dailyInventory: InventoryDailyData;
  public dailyDate: number;

  chartOpen: boolean[] = [true,true,true];  

  constructor(private router: Router,
    private authService: AuthService,
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
      this.dbRequestsService.getLastDailyInventoryByAbvName(abv).subscribe( inv => {
        if (inv && inv[0]) {
          this.dailyInventory = inv[0] 
          let date = inv[0].closedDate;
          this.dailyDate = Object(date).seconds*1000;
        }
      });
    }else {
      this.dailyInventory = null;
    }
    this.dbRequestsService.getLastWeeklyInventoryByAbvName(abv).subscribe(inv => {
      this.weeklyInventory = inv ? inv : null;
    });
  }

  async goToStockForm(type: FormType): Promise<void> {
    let permition = await this.getInventoryPermit();
    if (permition){
      if(this.selectedStore.nameAbbreviation === 'RVS' && type === this.formType.Daily) {
        this.router.navigateByUrl(`stock/daily-form/${this.selectedStore.nameAbbreviation}`)
      } else {
        if( type === this.formType.Weekly){ 
          this.router.navigateByUrl(`stock/inventory-form/${this.selectedStore.nameAbbreviation}`); 
        }
      }
    } else {
      let store = this.selectedStore.name;
      this.alertsService.warningPermission(store).then( alert => {
        alert.present();
      });
    }
  }

  private async getInventoryPermit() {
    let userAuth = await this.authService.authData().pipe(first()).toPromise();
    if (userAuth) {
      let userDb = await this.dbRequestsService.getUserFirestore(userAuth.uid).pipe(first()).toPromise();
      if (userDb) {
        if (userDb.isInventoryAdmin || userDb.displayName === 'empanadus') {
          return true;
        }
        if ( userDb.displayName === this.selectedStore.nameAbbreviation) {
          return true;
        }
      }
    }
    return false;
  }

  public goToUrl(type: string, id: string):void {
    this.router.navigateByUrl(`stock/view/${type}/${id}`)

  }
}
