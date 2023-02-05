import { Injectable } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    ) { }

  async showDBError(err) {
    let error = await this.alertController.create({
      header: "Connection Error!",
      message: "There was a problem connecting to the database. " +
      "Please make sure you are connected to the internet and try again.",
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.alertController.dismiss()
          }
        }
      ]
    })
    return await error.present()
  }

  async showAlert(header: string, message: string) {
    let alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.alertController.dismiss(null)
          }
        }
      ]
    })
    return await alert.present()
  }

  async showCancelAlert(itemNotSaved: string, modalController: ModalController) {
    let alert = await this.alertController.create({
      header: 'Warning',
      //itemNotSaved should be plural. ex. goals, notes or demographic info
      subHeader: 'Closing will not save the current changes to your ' + itemNotSaved + '.',
      message:'Are you sure you wish to close?',
      buttons: [
        'Cancel',
        {
          text: 'Yes',
          handler: () => {
            modalController.dismiss()
          }
        }
      ]
    })
    return await alert.present()
  }
  
}
