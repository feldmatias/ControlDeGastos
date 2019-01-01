import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { VariableIncome } from '../../models/VariableIncome';

@IonicPage()
@Component({
  selector: 'page-new-variable-income',
  templateUrl: 'new-variable-income.html',
})
export class NewVariableIncomePage {

  type: string;
  amount: number;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
  }

  submit(){
    let income = new VariableIncome({
      type: this.type,
      amount: Number(this.amount)
    });

    this.apiProvider.addVariableIncome(income);
    this.navCtrl.pop();
  }

}
