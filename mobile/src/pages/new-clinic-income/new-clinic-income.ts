import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-new-clinic-income',
  templateUrl: 'new-clinic-income.html',
})
export class NewClinicIncomePage {

  clinic_id: number;
  clinic_name: string;
  amount: number;
  date: string;
  min_date: string;
  max_date: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    this.clinic_id = this.navParams.get('id');
    this.clinic_name = this.navParams.get('name');
    
    var current_month = this.apiProvider.getCurrentMonth();
    this.min_date = current_month.start_date.format('YYYY-MM-DD');
    this.max_date = current_month.end_date.format('YYYY-MM-DD');

    this.date = (current_month.end_date > moment() ? moment() : current_month.end_date).format('YYYY-MM-DD');
  }

  submit(){
    let income = {
      clinic_id: this.clinic_id,
      amount: Number(this.amount),
      date: this.date
    };

    this.apiProvider.addClinicIncome(income, this.clinic_id);
    this.navCtrl.pop();
  }
}
