import { Component, Input, OnInit } from '@angular/core';
import { ChartDataList } from './inventory-chart.model';

@Component({
  selector: 'app-inventory-chart',
  templateUrl: './inventory-chart.component.html',
  styleUrls: ['./inventory-chart.component.scss'],
})

export class InventoryChartComponent implements OnInit {
  @Input() chartTitle: string = ''
  @Input() chartDataList: any[] = [];

  results: any[] = [
    {name: "Beef", value: 15},
    {name: "Chicken", value: 12},
    {name: "Tuna", value: 5},
    {name: "carne", value: 11},
    {name: "pollo", value: 10},
    {name: "capresse", value: 7},
    {name: "Vegan", value: 2},
    {name: "Apple", value: 5},
    {name: "JyQ", value: 13},
  ];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Quantity';
  showYAxisLabel = false;
  yAxisLabel = 'Empanadas';
  colorScheme = 'cool'

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor() {
    
  }

  ngOnInit() {

  }

  onSelect(event) {
    console.log(event);
  }
  
}
