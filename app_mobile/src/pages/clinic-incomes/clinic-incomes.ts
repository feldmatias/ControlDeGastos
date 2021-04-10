import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { Clinic, ClinicIncome } from '../../models/Clinic';
import { NewClinicIncomePage } from '../new-clinic-income/new-clinic-income';

@IonicPage()
@Component({
  selector: 'page-clinic-incomes',
  templateUrl: 'clinic-incomes.html',
})
export class ClinicIncomesPage extends BasicListPage{

  clinics: Array<Clinic>;
  selectedClinic: Clinic;
  month_length: number;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
    super(apiProvider);
  }

  updateData(){
    this.clinics = this.apiProvider.getCurrentMonth().clinics
          .filter(function(clinic){
             return !clinic.deleted || clinic.clinic_incomes.length > 0;
          });
    this.month_length = this.apiProvider.getCurrentMonth().current_days;
    this.selectedClinic = null;
  }

  newIncome(){
    this.navCtrl.push(NewClinicIncomePage, {id: this.selectedClinic.id, name: this.selectedClinic.name});
  }

  delete(income: ClinicIncome){
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
            this.apiProvider.deleteClinicIncome(income, this.selectedClinic);
          }
        }
      ]
    });
    alert.present();
  }

}
