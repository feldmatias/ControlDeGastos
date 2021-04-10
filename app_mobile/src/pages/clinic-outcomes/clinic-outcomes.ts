import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { Clinic, ClinicOutcome } from '../../models/Clinic';
import { NewClinicOutcomePage } from '../new-clinic-outcome/new-clinic-outcome';

@IonicPage()
@Component({
  selector: 'page-clinic-outcomes',
  templateUrl: 'clinic-outcomes.html',
})
export class ClinicOutcomesPage extends BasicListPage{

  clinics: Array<Clinic>;
  selectedClinic: Clinic;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public alertCtrl: AlertController) {
    super(apiProvider);
  }

  updateData(){
    this.clinics = this.apiProvider.getCurrentMonth().clinics
          .filter(function(clinic){
             return !clinic.deleted || clinic.clinic_outcomes.length > 0;
          });
    this.selectedClinic = null;
  }

  newOutcome(){
    this.navCtrl.push(NewClinicOutcomePage, {id: this.selectedClinic.id, name: this.selectedClinic.name});
  }

  delete(outcome: ClinicOutcome){
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
            this.apiProvider.deleteClinicOutcome(outcome, this.selectedClinic);
          }
        }
      ]
    });
    alert.present();
  }

}
