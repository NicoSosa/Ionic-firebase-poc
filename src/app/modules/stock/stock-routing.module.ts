import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryAdmPage } from './pages/inventory-adm/inventory-adm.page';
import { InventoryFormPage } from './pages/inventory-form/inventory-form.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryAdmPage
  },
  {
    path: 'inventory-form/:id',
    component: InventoryFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
