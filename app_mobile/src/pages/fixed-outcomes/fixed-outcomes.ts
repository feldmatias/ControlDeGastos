import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { FixedOutcomeType } from '../../models/FixedOutcome';
import { NewFixedOutcomePage } from '../new-fixed-outcome/new-fixed-outcome';

@IonicPage()
@Component({
  selector: 'page-fixed-outcomes',
  templateUrl: 'fixed-outcomes.html',
})
export class FixedOutcomesPage extends BasicListPage{

  fixed_outcomes: Array<FixedOutcomeType>;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    super(apiProvider);
  }

  updateData(){
    this.fixed_outcomes = this.apiProvider.getCurrentMonth().fixed_outcomes;
  }

  newOutcome(){
    this.navCtrl.push(NewFixedOutcomePage);
  }

  edit(outcome: FixedOutcomeType){
    this.navCtrl.push(NewFixedOutcomePage, {outcome: outcome});
  }

  hasOutcomes(){
    return this.fixed_outcomes.some(function(element){
      return element.fixed_outcomes.length > 0;
    });
  }

}
