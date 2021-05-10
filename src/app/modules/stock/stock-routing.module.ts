import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryAdmPage } from './pages/inventory-adm/inventory-adm.page';
import { InventoryDailyFormPage } from './pages/inventory-daily-form/inventory-daily-form.page';
import { InventoryWeeklyFormPage } from './pages/inventory-weekly-form/inventory-weekly-form.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryAdmPage
  },
  {
    path: 'daily-form/:id',
    component: InventoryDailyFormPage
  },
  {
    path: 'inventory-form/:id',
    component: InventoryWeeklyFormPage
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
