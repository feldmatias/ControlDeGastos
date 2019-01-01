import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { VariableIncome } from '../../models/VariableIncome';
import { NewVariableIncomePage } from '../new-variable-income/new-variable-income';


@IonicPage()
@Component({
  selector: 'page-variable-incomes',
  templateUrl: 'variable-incomes.html',
})
export class VariableIncomesPage extends BasicListPage{

  incomes: Array<VariableIncome>;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
    super(apiProvider);
  }

  updateData(){
    this.incomes = this.apiProvider.getCurrentMonth().variable_incomes;
  }

  newIncome(){
    this.navCtrl.push(NewVariableIncomePage);
  }

  delete(income: VariableIncome){
    let alert = this.alertCtrl.create({
      title: 'Eliminar Ingreso',
      message: 'Seguro que desea eliminar el ingreso?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.apiProvider.deleteVariableIncome(income);
          }
        }
      ]
    });
    alert.present();
  }

}
