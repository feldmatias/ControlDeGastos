import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DollarPurchase } from '../../models/DollarPurchase';

@IonicPage()
@Component({
  selector: 'page-new-dollar-purchase',
  templateUrl: 'new-dollar-purchase.html',
})
export class NewDollarPurchasePage {

  dollar_amount: number;
  pesos_amount: number;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
  }

  submit(){
    let purchase = new DollarPurchase({
      dollar_amount: Number(this.dollar_amount),
      pesos_amount: Number(this.pesos_amount)
    });

    this.apiProvider.addDollarPurchase(purchase);
    this.navCtrl.pop();
  }

}
