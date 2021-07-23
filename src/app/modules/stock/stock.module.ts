import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StockRoutingModule } from './stock-routing.module';
import { InventoryAdmPage } from './pages/inventory-adm/inventory-adm.page';
import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InventoryDailyFormPage } from './pages/inventory-daily-form/inventory-daily-form.page';
import { InvInputSliderFormComponent } from './components/inv-input-slider-form/inv-input-slider-form.component';
import { InventoryWeeklyFormPage } from './pages/inventory-weekly-form/inventory-weekly-form.page';
import { InvOnlyInputFormComponent } from './components/inv-only-input-form/inv-only-input-form.component';
import { InvIsNeededInputFormComponent } from './components/inv-is-needed-input-form/inv-is-needed-input-form.component';
import { InvIsNeededHideFormComponent } from './components/inv-is-needed-hide-form/inv-is-needed-hide-form.component';
import { InvIsNeededOnlyFormComponent } from './components/inv-is-needed-only-form/inv-is-needed-only-form.component';
import { InventoryViewLastsGeneratedPage } from './pages/inventory-view-lasts-generated/inventory-view-lasts-generated.page';
import { ViewInvListItemsComponent } from './components/view-inv-list-items/view-inv-list-items.component';
import { InvSliderDownComponent } from './components/inv-slider-down/inv-slider-down.component';
import { ManagInventoryFormService } from './services/manag-inventory-form.service';
import { InventoryLocalStorageService } from './services/inventory-local-storage.service';
import { ItemsLogicService } from './services/items-logic.service';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    InventoryAdmPage,
    InventoryDailyFormPage,
    InventoryWeeklyFormPage,
    InventoryViewLastsGeneratedPage,
    InvInputSliderFormComponent,
    InvOnlyInputFormComponent,
    InvIsNeededInputFormComponent,
    InvIsNeededHideFormComponent,
    InvIsNeededOnlyFormComponent,
    InvSliderDownComponent,
    ViewInvListItemsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule,
    SharedModule,
    NgxChartsModule,
    PipesModule
  ],
  exports: [
    InventoryAdmPage,
    InventoryDailyFormPage,
    InventoryViewLastsGeneratedPage
  ],
  providers: [
    ManagInventoryFormService,
    InventoryLocalStorageService,
    ItemsLogicService
  ]
})
export class StockModule { }
