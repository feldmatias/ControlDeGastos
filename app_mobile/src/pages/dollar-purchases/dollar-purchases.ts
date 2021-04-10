import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { DollarPurchase } from '../../models/DollarPurchase';
import { NewDollarPurchasePage } from '../new-dollar-purchase/new-dollar-purchase';

@IonicPage()
@Component({
  selector: 'page-dollar-purchases',
  templateUrl: 'dollar-purchases.html',
})
export class DollarPurchasesPage extends BasicListPage{

  dollar_purchases: Array<DollarPurchase>;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
    super(apiProvider);
  }

  updateData(){
    this.dollar_purchases = this.apiProvider.getCurrentMonth().dollar_purchases;
  }

  newPurchase(){
    this.navCtrl.push(NewDollarPurchasePage);
  }

  delete(purchase: DollarPurchase){
    let alert = this.alertCtrl.create({
      title: 'Eliminar Compra de Dólares',
      message: 'Seguro que desea eliminar la compra de dólares?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.apiProvider.deleteDollarPurchase(purchase);
          }
        }
      ]
    });
    alert.present();
  }

}
