import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  isLoading = false;

  constructor(private loadingController: LoadingController,
    private alertController: AlertController) { }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please, wait...',
      animated: true,
      spinner: 'circles',
      duration: 3000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then();
  }

  async selectOneOptionAlert(data: any) {
    return await this.alertController.create({
      cssClass: 'one-option-alert',
      subHeader: 'Please select an option',
      keyboardClose: true,
      backdropDismiss: false,
      header: data.header,
      inputs: data.inputs,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'cancel-button',
        handler: () => { }
      }, {
        text: 'Ok',
        role: 'ok',
        cssClass: 'accept-button',
        handler: (value) => { return value; }
      }]
    });
  }

  async warningDelete() {
    return await this.alertController.create({
      cssClass: 'warning-delete-alert',
      subHeader: 'Do you want to delete all your progress?',
      keyboardClose: true,
      backdropDismiss: false,
      header: 'Atention!',
      buttons: [{
        text: 'No, I dont',
        role: 'cancel',
        cssClass: 'accept-button',
        handler: () => { }
      }, {
        text: 'Yes, I want',
        role: 'ok',
        cssClass: 'accept-button',
        handler: () => { }
      }]
    });
  }

  async warningSaveData() {
    return await this.alertController.create({
      cssClass: 'warning-save-alert',
      subHeader: 'Do you want to save this form?',
      keyboardClose: true,
      backdropDismiss: false,
      header: 'Atention!',
      buttons: [{
        text: 'No, I dont',
        role: 'cancel',
        cssClass: 'cancel-button',
        handler: () => { }
      }, {
        text: 'Yes, I want',
        role: 'ok',
        cssClass: 'accept-button',
        handler: () => { }
      }]
    });
 
  }
  async warningPermission(store: string) {
    return await this.alertController.create({
      cssClass: 'warning-delete-alert',
      subHeader: `You can't create an inventory for ${store} with your account.`,
      keyboardClose: true,
      backdropDismiss: false,
      header: 'Insufficient permissions',
      buttons: [{
        text: 'Ok',
        role: 'ok',
        cssClass: 'accept-button',
        handler: () => { }
      }]
    });
  }

}
