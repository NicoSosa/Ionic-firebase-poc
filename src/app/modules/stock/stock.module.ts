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
import { InventoryDailyFormPage } from './pages/inventory-daily-form/inventory-daily-form.page';
import { InvInputSliderFormComponent } from './components/inv-input-slider-form/inv-input-slider-form.component';
import { InventoryWeeklyFormPage } from './pages/inventory-weekly-form/inventory-weekly-form.page';
import { InvOnlyInputFormComponent } from './components/inv-only-input-form/inv-only-input-form.component';
import { InvIsNeededInputFormComponent } from './components/inv-is-needed-input-form/inv-is-needed-input-form.component';
import { InvIsNeededHideFormComponent } from './components/inv-is-needed-hide-form/inv-is-needed-hide-form.component';

@NgModule({
  declarations: [
    InventoryAdmPage,
    InventoryFormPage,
    InventoryDailyFormPage,
    InventoryWeeklyFormPage,
    InvInputSliderFormComponent,
    InvOnlyInputFormComponent,
    InvIsNeededInputFormComponent,
    InvIsNeededHideFormComponent,
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
    InventoryFormPage,
    InventoryDailyFormPage
  ]
})
export class StockModule { }
