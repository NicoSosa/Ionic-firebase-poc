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
import { AdmStoresPage } from './pages/adm-stores/adm-stores.page';
import { AdmStructPage } from './pages/adm-struct/adm-struct.page';
import { CategoriesModalComponent } from './modals/categories-modal/categories-modal.component';
import { PagesModalComponent } from './modals/pages-modal/pages-modal.component';
import { ItemModalComponent } from './modals/item-modal/item-modal.component';
import { AdmMasiveChangesPage } from './pages/adm-masive-changes/adm-masive-changes.page';



@NgModule({
  entryComponents: [
    CategoriesModalComponent,
    PagesModalComponent,
    ItemModalComponent
  ],
  declarations: [
    AdminPage,
    AdmItemsPage,
    AdmMasiveChangesPage,
    AdmProductsPage,
    AdmStoresPage,
    AdmStructPage,
    AdmUsersPage,
    CategoriesModalComponent,
    PagesModalComponent,
    ItemModalComponent
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
