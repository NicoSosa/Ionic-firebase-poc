import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DbRequestsService } from '../../db-requests.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private afAuth: AngularFireAuth,
    private dbRequestsService: DbRequestsService,
    private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    let idObservable = this.afAuth.idTokenResult;
    let idTokenResult = await idObservable.pipe(first()).toPromise()
    if (idTokenResult) {
      let uid: string = idTokenResult.claims.user_id;
      let userObservable = this.dbRequestsService.getUserFirestore(uid);
      let user = await userObservable.pipe(first()).toPromise();
      if (user.isInventoryAdmin) {
        return true;
      }else {
        this.router.navigateByUrl('stock');
        return false;
      }
    } else {
      this.router.navigateByUrl('stock');
      return false;
    }

  }
  
}
