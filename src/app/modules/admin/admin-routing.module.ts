import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPage } from './pages/admin/admin.page';
import { AdmItemsPage } from './pages/adm-items/adm-items.page';
import { AdmUsersPage } from './pages/adm-users/adm-users.page';
import { AdmStructPage } from './pages/adm-struct/adm-struct.page';
import { AdmMasiveChangesPage } from './pages/adm-masive-changes/adm-masive-changes.page';


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
    path: 'masive-changes',
    component: AdmMasiveChangesPage
  },
  {
    path: 'structure',
    component: AdmStructPage
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
