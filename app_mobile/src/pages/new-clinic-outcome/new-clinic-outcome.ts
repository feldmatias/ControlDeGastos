import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ClinicOutcomeType } from '../../models/Clinic';
import { BasicSearchSelectPage } from '../BasicSearchSelectPage';

@IonicPage()
@Component({
  selector: 'page-new-clinic-outcome',
  templateUrl: 'new-clinic-outcome.html',
})
export class NewClinicOutcomePage extends BasicSearchSelectPage{

  clinic_id: number;
  clinic_name: string;
  amount: number;
  type: string;
  type_name: string;
  types: Array<ClinicOutcomeType>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    super();

    this.clinic_id = this.navParams.get('id');
    this.clinic_name = this.navParams.get('name');

    this.types = this.apiProvider.getClinicOutcomeTypes()
                      .filter(function(type){
                         return !type.deleted;
                      });

    this.types.unshift(new ClinicOutcomeType({name: this.other_type_name}));
  }

  submit(){
    let outcome = {
      type: this.getTypeName(),
      amount: Number(this.amount),
      clinic_id: this.clinic_id
    };

    this.apiProvider.addClinicOutcome(outcome, this.clinic_id);
    this.navCtrl.pop();
  }

}
