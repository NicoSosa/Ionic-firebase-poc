import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPage } from './pages/admin/admin.page';
import { AdmProductsPage } from './pages/adm-products/adm-products.page';
import { AdmItemsPage } from './pages/adm-items/adm-items.page';
import { AdmUsersPage } from './pages/adm-users/adm-users.page';
import { AdmStoresPage } from './pages/adm-stores/adm-stores.page';


const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'items',
    component: AdmItemsPage
  },
  {
    path: 'products',
    component: AdmProductsPage
  },
  {
    path: 'stores',
    component: AdmStoresPage
  },
  {
    path: 'users',
    component: AdmUsersPage
  },
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
