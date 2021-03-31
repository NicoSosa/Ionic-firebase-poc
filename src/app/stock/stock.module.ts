import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StockRoutingModule } from './stock-routing.module';
import { InventoryAdmPage } from './pages/inventory-adm/inventory-adm.page';
import { InventoryFormPage } from './pages/inventory-form/inventory-form.page';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InventoryAdmPage,
    InventoryFormPage,
    StockFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule,
    SharedModule
  ],
  exports: [
    InventoryAdmPage,
    InventoryFormPage
  ]
})
export class StockModule { }
