import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { ToastsService } from './services/userMsgs/toasts.service';
import { Router } from '@angular/router';
import { ADMIN_MAIL, ADMIN_MENU, USER_MENU } from './infrastructure/constants/sidebarMenu.constants';
import { AuthUser } from './models/auth/authUser.model';
import { DbRequestsService } from './services/db-requests.service';
import { AlertsService } from './services/userMsgs/alerts.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoged: boolean;
  userName: string;
  authUser: AuthUser;

  public appPages = null; 
  constructor(private router: Router,
    private dbRequestsService: DbRequestsService,
    private authService: AuthService,
    private alertsService: AlertsService,
    private toastsService: ToastsService) {
      this.initialProcess();
  }

  private initialProcess(): void {
    this.alertsService.presentLoading();
    this.authUser = null;
    this.authService.isLogedIn().subscribe( loged =>{
      if( !loged ){
        this.alertsService.dismissLoading();
      }
      this.isLoged = loged
    });
    this.authService.authData().subscribe( authData => {
      if(authData){
        this.dbRequestsService.getUserFirestore(authData.uid).subscribe( afUser => {
          if(afUser){
            this.userName = authData.email;
            this.authUser = {...afUser, ...authData};
            if (this.authUser.isInventoryUser) {
              this.appPages = USER_MENU;
            }
            if (this.authUser.isInventoryAdmin) {
              this.appPages = ADMIN_MENU;
            }
          } else {
            this.appPages = null;
          }
          this.alertsService.dismissLoading();
        });
      }
    });
  }

  logOut(): void {
    this.authService.logout().then( () =>  {
      this.router.navigateByUrl('login');
      this.authUser = null;
      this.appPages = null;
    }).catch( error => 
      this.toastsService.errorToast(error)
    )
  }
}
