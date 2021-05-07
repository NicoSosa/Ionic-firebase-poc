import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor(private toastController: ToastController) { }

  async savedItemToast(savedMsg: string) {
    const toast = await this.toastController.create({
      position: 'middle',
      color: 'success',
      message: `${savedMsg}`,
      duration: 2000,
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        }]
    });

    toast.present();
  }
  async errorToast(err: string) {
    const toast = await this.toastController.create({
      position: 'middle',
      color: 'danger',
      message: `Ups! - ${err}`,
      duration: 3000,
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        }]
    });

    toast.present();
  }
}
