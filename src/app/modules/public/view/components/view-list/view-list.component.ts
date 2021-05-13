import { Component, Input, OnInit } from '@angular/core';
import { InventoryDailyData } from 'src/app/models/inventories/inventoryDailyData.model';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
})
export class ViewListComponent implements OnInit {
  @Input() inventory: InventoryDailyData;
  public dailyDate: number;

  constructor() { }

  ngOnInit() {
    this.initialProcess();
  }
  initialProcess(): void{
    const date = this.inventory.closedDate;
    this.dailyDate = Object(date).seconds*1000; 
  }
}
