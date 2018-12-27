import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { BasicDeletableModel } from '../../models/BasicModel';
import { NewListableTypePage } from '../new-listable-type/new-listable-type';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage extends BasicListPage{

  data: Array<ConfigurationData>;
  selectedData: ConfigurationData;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
    super(apiProvider);
  }

  updateData(){
    this.selectedData = null;

    this.data = [
      { display_name: 'Clínicas', type: 'clinic', list: this.apiProvider.getCurrentMonth().clinics },
      { display_name: 'Departamentos', type: 'department', list: this.apiProvider.getCurrentMonth().departments },
      { display_name: 'Gastos Fijos', type: 'fixed_outcome', list: this.apiProvider.getCurrentMonth().fixed_outcomes },
      { display_name: 'Gastos Variables', type: 'variable_outcome', list: this.apiProvider.getVariableOutcomeTypes() },
      { display_name: 'Gastos de Clínicas', type: 'clinic_outcome', list: this.apiProvider.getClinicOutcomeTypes() },
      { display_name: 'Balance de caja', type: 'month_result', list: this.apiProvider.getCurrentMonth().results },
    ];
  }

  newListableType(){
    this.navCtrl.push(NewListableTypePage, {type: this.selectedData.type, display_name: this.selectedData.display_name});
  }

  delete(item: BasicDeletableModel){
    let alert = this.alertCtrl.create({
      title: 'Eliminar Dato Listable',
      message: `Seguro que desea eliminar el dato '${item.name}' del listado de ${this.selectedData.display_name}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.deleteItem(item);
          }
        }
      ]
    });
    alert.present();
  }

  private deleteItem(item: BasicDeletableModel){
    switch (this.selectedData.type){
      case 'clinic':
        this.apiProvider.deleteClinic(item);
        break;

      case 'department':
        this.apiProvider.deleteDepartment(item);
        break;

      case 'fixed_outcome':
        this.apiProvider.deleteFixedOutcomeType(item);
        break;

      case 'variable_outcome':
        this.apiProvider.deleteVariableOutcomeType(item);
        break;

      case 'clinic_outcome':
        this.apiProvider.deleteClinicOutcomeType(item);
        break;

      case 'month_result':
        this.apiProvider.deleteMonthResultType(item);
        break;
    }
  }

}

class ConfigurationData{
  display_name: string;
  type: string;
  list: Array<BasicDeletableModel>;
}

