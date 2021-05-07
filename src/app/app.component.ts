import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { ToastsService } from './services/userMsgs/toasts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userName: string;

  public appPages = [
    { title: 'Inventory Form', url: 'stock', icon: 'clipboard' },
  ];
  constructor(private router: Router,
    private authService: AuthService,
    private toastsService: ToastsService) {
    this.authService.userData().subscribe( data => {
      if (data){
        this.userName = data.email;
        if (data.email === 'nico.js69@gmail.com') {
          this.appPages = [
            { title: 'Inventory Form', url: 'stock', icon: 'clipboard' },
            { title: 'Admin', url: 'admin', icon: 'settings' },
            { title: 'User', url: 'user', icon: 'person-circle' },
          ];
        } else {
          this.appPages = [
            { title: 'Inventory Form', url: 'stock', icon: 'clipboard' },
          ];
        }
      }
    });
  }

  logOut() {
    this.authService.logout().then( () =>  this.router.navigateByUrl('login')).catch( error => 
      this.toastsService.errorToast(error)
    )
  }
}
