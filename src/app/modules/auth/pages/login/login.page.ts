import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastsService } from 'src/app/services/userMsgs/toasts.service';
import { AlertsService } from '../../../../services/userMsgs/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGrp: FormGroup;
  showPassword = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private alertsService:AlertsService,
              private toastsService: ToastsService,
              private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.formGrp = this.formBuilder.group({
      EmailUser: ['', [ Validators.required, Validators.maxLength(50) ]],
      PassUser: ['', [ Validators.required ]],
    });
  }

  get emailUser(): FormControl {
    return this.formGrp.get('EmailUser') as FormControl;
  }
  get passUser(): FormControl {
    return this.formGrp.get('PassUser') as FormControl;
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  async submit() {
    this.alertsService.presentLoading();
    const email = this.emailUser.value;
    const pass = this.passUser.value;
    await this.authService.login(email, pass).then(
      oResp => {
        if (oResp) {
          this.emailUser.setValue('');
          this.passUser.setValue('');
          this.router.navigateByUrl('stock');
        }
      }).catch( error => {
        this.toastsService.errorToast(error.message);
      }).finally( () => this.alertsService.dismissLoading())
  }


}
