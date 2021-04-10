import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { VariableOutcome, VariableOutcomeType } from '../../models/VariableOutcome';
import { BasicSearchSelectPage } from '../BasicSearchSelectPage';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-new-variable-outcome',
  templateUrl: 'new-variable-outcome.html',
})
export class NewVariableOutcomePage extends BasicSearchSelectPage {

  types: Array<VariableOutcomeType>;
  type: string;
  type_name: string;
  amount: number;
  extra: boolean = false;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    super();

    this.types = this.apiProvider.getVariableOutcomeTypes()
                      .filter(function(type){
                         return !type.deleted;
                      });

    this.types.unshift(new VariableOutcomeType({name: this.other_type_name}));
  }

  submit(){
    let outcome = new VariableOutcome({
      type: this.getTypeName(),
      amount: Number(this.amount),
      extra: this.extra,
      created_at: moment().format()
    });

    this.apiProvider.addVariableOutcome(outcome);
    this.navCtrl.pop();
  }

}
