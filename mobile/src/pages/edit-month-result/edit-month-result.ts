import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { MonthResultType } from '../../models/MonthResult';

@IonicPage()
@Component({
  selector: 'page-edit-month-result',
  templateUrl: 'edit-month-result.html',
})
export class EditMonthResultPage {

  month_result: MonthResultType;
  amount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    this.month_result = this.navParams.get('result');
    this.amount = this.month_result.amount;
  }

  submit(){
    let data = {
      id: this.month_result.month_results[0] ? this.month_result.month_results[0].id : 0,
      amount: Number(this.amount),
      month_result_value_id: this.month_result.id
    }

    this.apiProvider.editMonthResult(data);
    this.navCtrl.pop();
  }

}
