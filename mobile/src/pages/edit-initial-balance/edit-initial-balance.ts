import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-edit-initial-balance',
  templateUrl: 'edit-initial-balance.html',
})
export class EditInitialBalancePage {

  calculated_initial_balance: number;
  initial_balance: number;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    var current_month = this.apiProvider.getCurrentMonth();

    this.calculated_initial_balance = current_month.merged_previous_month ? 
        current_month.merged_month_data.initial_balance : current_month.calculated_initial_balance;
    
    if (current_month.initial_balance){
      this.initial_balance = current_month.initial_balance;
    } else if (current_month.merged_previous_month) {
      this.initial_balance = current_month.merged_month_data.initial_balance;
    } else {
      this.initial_balance = current_month.calculated_initial_balance;
    }

  }

  submit(){
    this.apiProvider.editInitialBalance(Number(this.initial_balance));
    this.navCtrl.pop();
  }

}
