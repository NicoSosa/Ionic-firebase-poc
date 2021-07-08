import { Component, Input, OnInit } from '@angular/core';
import { InventoryDailyData } from '../../../../models/inventories/inventoryDailyData.model';
import { InventoryWeeklyData } from '../../../../models/inventories/inventoryWeeklyData.model';

@Component({
  selector: 'app-view-inv-list-items',
  templateUrl: './view-inv-list-items.component.html',
  styleUrls: ['./view-inv-list-items.component.scss'],
})
export class ViewInvListItemsComponent implements OnInit {
  @Input() inventory: InventoryDailyData;
  @Input() typeInventory: string;
  public dailyDate: number;
  public isHide = false;

  constructor() { }

  ngOnInit() {
    this.initialProcess();
    console.log(this.inventory);
  }
  initialProcess(): void{
    const date = this.inventory.closedDate;
    this.dailyDate = Object(date).seconds*1000; 
  }

  toggleHide(){
    this.isHide = !this.isHide
  }
}
