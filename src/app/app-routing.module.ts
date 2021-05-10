import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { customClaims } from '@angular/fire/auth-guard';
import { AdminGuard } from './services/auth/guard/admin.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const adminOnly = () => pipe(customClaims, map(claims => claims.role === 'inventoryAdmin'));
const userAndAdminOnly = () => pipe(customClaims, map(claims => (claims.role === 'inventoryUser' || claims.role === 'inventoryAdmin')));

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stock',
    pathMatch: 'full'
  },
  {
    path: 'stock',
    loadChildren: () => import('./modules/stock/stock.module').then( m => m.StockModule),
    canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then( m => m.AdminModule),
    canActivate:[AngularFireAuthGuard, AdminGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then( m => m.UserModule),
    canActivate:[AngularFireAuthGuard, AdminGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
