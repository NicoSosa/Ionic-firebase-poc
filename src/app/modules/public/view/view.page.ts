import { Component, OnInit } from '@angular/core';
import { InventoryDailyData } from 'src/app/models/inventories/inventoryDailyData.model';
import { DbRequestsService } from 'src/app/services/db-requests.service';
import { AlertsService } from '../../../services/userMsgs/alerts.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  public inventory: InventoryDailyData;

  constructor(private dbRequestsService: DbRequestsService,
    private alertsService: AlertsService) { }

  ngOnInit() {
    this.alertsService.presentLoading().then();
    this.dbRequestsService.getLastDailyInventoryByAbvName('RVS').subscribe( inventoryList => {
      this.inventory = inventoryList[0];
      this.alertsService.dismissLoading();
    });
  }

}
