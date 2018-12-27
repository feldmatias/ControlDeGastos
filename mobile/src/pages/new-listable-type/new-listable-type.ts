import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize';

@IonicPage()
@Component({
  selector: 'page-new-listable-type',
  templateUrl: 'new-listable-type.html',
  providers: [CapitalizePipe],
})
export class NewListableTypePage {

  data_type: string;
  data_name: string;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public capitalizePipe: CapitalizePipe) {
    this.data_type = this.navParams.get('type');
    this.data_name = this.navParams.get('display_name');
  }

  submit(){
    let data = {
      name: this.capitalizePipe.transform(this.name)
    };

    switch (this.data_type){
      case 'clinic':
        this.apiProvider.addClinic(data);
        break;

      case 'department':
        this.apiProvider.addDepartment(data);
        break;

      case 'fixed_outcome':
        this.apiProvider.addFixedOutcomeType(data);
        break;

      case 'variable_outcome':
        this.apiProvider.addVariableOutcomeType(data);
        break;

      case 'clinic_outcome':
        this.apiProvider.addClinicOutcomeType(data);
        break;

      case 'month_result':
        this.apiProvider.addMonthResultType(data);
        break;
    }

    this.navCtrl.pop();
  }

}
