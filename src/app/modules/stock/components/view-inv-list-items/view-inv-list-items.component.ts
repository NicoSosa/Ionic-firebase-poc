import { Component, Input, OnInit } from '@angular/core';
import { InventoryDailyData } from '../../../../models/inventories/inventoryDailyData.model';

@Component({
  selector: 'app-view-inv-list-items',
  templateUrl: './view-inv-list-items.component.html',
  styleUrls: ['./view-inv-list-items.component.scss'],
})
export class ViewInvListItemsComponent implements OnInit {
  @Input() inventory: InventoryDailyData;
  public dailyDate: number;
  public isHide = false;

  constructor() { }

  ngOnInit() {
    this.initialProcess();
  }
  initialProcess(): void{
    const date = this.inventory.closedDate;
    this.dailyDate = Object(date).seconds*1000; 
  }

  toggleHide(){
    this.isHide = !this.isHide
  }
}
