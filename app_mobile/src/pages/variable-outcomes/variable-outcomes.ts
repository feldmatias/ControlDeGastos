import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { VariableOutcome } from '../../models/VariableOutcome';
import { NewVariableOutcomePage } from '../new-variable-outcome/new-variable-outcome';


@IonicPage()
@Component({
  selector: 'page-variable-outcomes',
  templateUrl: 'variable-outcomes.html',
})
export class VariableOutcomesPage extends BasicListPage{

  variable_outcomes: Array<VariableOutcome>;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
    super(apiProvider);
  }

  updateData(){
    this.variable_outcomes = this.apiProvider.getCurrentMonth().variable_outcomes;
  }

  newOutcome(){
    this.navCtrl.push(NewVariableOutcomePage);
  }

  delete(outcome: VariableOutcome){
    let alert = this.alertCtrl.create({
      title: 'Eliminar Gasto',
      message: 'Seguro que desea eliminar el gasto?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.apiProvider.deleteVariableOutcome(outcome);
          }
        }
      ]
    });
    alert.present();
  }

}
