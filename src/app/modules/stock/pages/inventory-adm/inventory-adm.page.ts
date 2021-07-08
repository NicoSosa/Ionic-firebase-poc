import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryViewModel } from '../../../../models/inventories/inventoryView.Model';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';
import { ALERT_TYPE_OF_FORM_DATA } from '../../constants/inventoryConstants';
import { AuthService } from '../../../../services/auth/auth.service';
import { first } from 'rxjs/operators';
import { InventoryDailyData } from '../../../../models/inventories/inventoryDailyData.model';
import { FormType } from '../../../../infrastructure/enum/formType.enum';
import { StoreAbv, StoresName, StoresAbvDescript } from '../../../../infrastructure/enum/stores.enum';
import { InventoryReportService } from '../../../../services/firestore-requests/inventory-report.service';
import { InventoryUsersService } from '../../../../services/firestore-requests/inventory-users.service';
import { STORES_NAME_LIST } from 'src/app/infrastructure/constants/storeList.constants';
import { InventoryWeeklyData } from 'src/app/models/inventories/inventoryWeeklyData.model';

@Component({
  selector: 'app-inventory-adm',
  templateUrl: './inventory-adm.page.html',
  styleUrls: ['./inventory-adm.page.scss'],
})
export class InventoryAdmPage implements OnInit {
  public tittleToolbar: string = 'Inventory Adm';

  public storeList = STORES_NAME_LIST;
  private selectedStore: StoresName = StoresName.RVS;
  private storeAbv: StoreAbv = StoresAbvDescript.get(this.selectedStore);
  public formType = FormType;

  public weeklyInventory: InventoryWeeklyData;
  public dailyInventory: InventoryDailyData;
  public weeklyDate: number;
  public dailyDate: number;

  chartOpen: boolean[] = [true,true,true];  

  constructor(private router: Router,
    private authService: AuthService,
    private alertsService: AlertsService,
    private inventoryReportService: InventoryReportService,
    private inventoryUsersService: InventoryUsersService) { }

  ngOnInit() {
    this.changeSelectedInventory();
  }

  segmentChanged(event): void{
    const selectedIndex = Number(event.detail.value);
    switch (selectedIndex) {
      case 0:
        this.selectedStore = StoresName.RVS;    
        break;
      case 1:
        this.selectedStore = StoresName.LGE;    
        break;
      case 2:
        this.selectedStore = StoresName.HWD;    
        break;
    }
    
    this.storeAbv = StoresAbvDescript.get(this.selectedStore);
    this.changeSelectedInventory();
  }

  private changeSelectedInventory(): void{
    this.inventoryReportService.getLastDailyInventoryByAbvName(this.selectedStore).subscribe( inv => {
      if (inv && inv[0]) {
        this.dailyInventory = inv[0] 
        let date = inv[0].closedDate;
        this.dailyDate = Object(date).seconds*1000;
      } else {
        this.dailyInventory = null;
      }
    });
    this.inventoryReportService.getLastWeeklyInventoryByAbvName(this.selectedStore).subscribe(inv => {
      if (inv && inv[0]) {
        this.weeklyInventory = inv[0] 
        let date = inv[0].closedDate;
        this.weeklyDate = Object(date).seconds*1000;
      } else {
        this.weeklyInventory= null;
      }
    });
  }

  async goToStockForm(type: FormType): Promise<void> {
    let permition = await this.getInventoryPermit();
    if (permition){
      if( type === this.formType.Daily) {
        this.router.navigateByUrl(`stock/daily-form/${this.storeAbv}`)
      } else {
        if( type === this.formType.Weekly){ 
          this.router.navigateByUrl(`stock/inventory-form/${this.storeAbv}`); 
        }
      }
    } else {
      let store = StoresAbvDescript.get(StoresName.RVS)
      this.alertsService.warningPermission(store).then( alert => {
        alert.present();
      });
    }
  }

  private async getInventoryPermit() {
    let userAuth = await this.authService.authData().pipe(first()).toPromise();
    if (userAuth) {
      let userDb = await this.inventoryUsersService.getUserFirestore(userAuth.uid).pipe(first()).toPromise();
      if (userDb) {
        if (userDb.isInventoryAdmin || userDb.displayName === 'empanadus') {
          return true;
        }
        if ( userDb.displayName === this.storeAbv) {
          return true;
        }
      }
    }
    return false;
  }

  public goToUrl(type: string):void {
    this.router.navigateByUrl(`stock/view/${type}/${this.storeAbv}`)
  }
}
