import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StockRoutingModule } from './stock-routing.module';
import { InventoryAdmPage } from './pages/inventory-adm/inventory-adm.page';
import { InventoryFormPage } from './pages/inventory-form/inventory-form.page';
import { SharedModule } from '../shared/shared.module';
import { InventoryChartComponent } from './components/inventory-chart/inventory-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    InventoryAdmPage,
    InventoryFormPage,
    InventoryChartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule,
    SharedModule,
    NgxChartsModule
  ],
  exports: [
    InventoryAdmPage,
    InventoryFormPage
  ]
})
export class StockModule { }
