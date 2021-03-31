import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPage } from './pages/admin/admin.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdmItemsPage } from './pages/adm-items/adm-items.page';
import { AdmProductsPage } from './pages/adm-products/adm-products.page';
import { AdmUsersPage } from './pages/adm-users/adm-users.page';



@NgModule({
  declarations: [
    AdminPage,
    AdmItemsPage,
    AdmProductsPage,
    AdmUsersPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports: [AdminPage]
})
export class AdminModule { }
