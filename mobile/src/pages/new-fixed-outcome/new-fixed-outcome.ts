import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FixedOutcomeType } from '../../models/FixedOutcome';

@IonicPage()
@Component({
  selector: 'page-new-fixed-outcome',
  templateUrl: 'new-fixed-outcome.html',
})
export class NewFixedOutcomePage {

  types: Array<FixedOutcomeType>;
  selectedTypeId: number;
  amount: number;
  id: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    var type : FixedOutcomeType = this.navParams.get('outcome');
    if (type){
      this.id = type.fixed_outcomes[0].id;
      this.selectedTypeId = type.id;
      this.amount = type.fixed_outcomes[0].amount;
    }

    this.types = this.apiProvider.getCurrentMonth().fixed_outcomes
                              .filter(function(element){
                                return (!element.deleted && element.fixed_outcomes.length == 0) || (type && element.id == type.id);
                              });
  }

  submit(){
    let outcome = {
      id: this.id,
      amount: Number(this.amount),
      fixed_outcome_type_id: this.selectedTypeId
    };

    this.apiProvider.addFixedOutcome(outcome);
    this.navCtrl.pop();
  }

}
