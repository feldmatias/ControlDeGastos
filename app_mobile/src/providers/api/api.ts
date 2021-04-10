import { ServerProvider } from '../server/server';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { ServerData } from '../../models/ServerData';
import { ToastController } from 'ionic-angular';
import { Clinic } from '../../models/Clinic';
import { DollarPurchase } from '../../models/DollarPurchase';
import { BasicDeletableModel } from '../../models/BasicModel';


@Injectable()
export class ApiProvider {

  private dataUpdatedSource = new Subject<boolean>();
  dataUpdated = this.dataUpdatedSource.asObservable();

  private data: ServerData;

  constructor(public server: ServerProvider, public toastCtrl: ToastController) {
    this.updateMonth();
  }

  updateMonth(id: number = 0){
    let url = 'getMonthData';
    if (id){
      url += '/' + id;
    }
    
    this.server.get(url).subscribe((data) => {
                      this.data = new ServerData(data); 
                      this.onDataUpdated();
                    },
                    error => this.onDataUpdated());
  }

  mergeMonthWithNext(){
    let url = 'month/merge/' + this.getCurrentMonth().id;

    this.server.get(url).subscribe((data) => {
                    this.data = new ServerData(data); 
                    this.onDataUpdated();
                    this.showToast('Mes juntado con el mes siguiente');
                  })
  }

  unmergeMonthWithNext(){
    let url = 'month/unmerge/' + this.getCurrentMonth().id;

    this.server.get(url).subscribe((data) => {
                    this.data = new ServerData(data); 
                    this.onDataUpdated();
                    this.showToast('Mes separado del mes siguiente');
                  })
  }

  onDataUpdated(){
    this.dataUpdatedSource.next(true);
  }

  hasData(){
    return Boolean(this.data);
  }

  getMonthsList(){
    return this.data.months;
  }

  getCurrentMonth(){
    return this.data.month;
  }

  canEdit(){
    return this.getCurrentMonth().can_edit;
  }

  getVariableOutcomeTypes(){
    return this.data.variable_outcome_types;
  }

  getClinicOutcomeTypes(){
    return this.data.clinic_outcome_types;
  }

  addVariableOutcome(outcome){
    let url = 'variableOutcome/store';

    outcome.month_id = this.getCurrentMonth().id;

    this.server.post(url, outcome).subscribe((id) => {
                    outcome.id = id;
                    this.getCurrentMonth().addVariableOutcome(outcome);
                    this.showToast('Gasto variable agregado con éxito');
                  })
  }

  deleteVariableOutcome(outcome){
    let url = 'variableOutcome/delete/' + outcome.id;

    this.server.post(url, outcome).subscribe(() => {
                    this.getCurrentMonth().deleteVariableOutcome(outcome);
                    this.showToast('Gasto variable eliminado con éxito');
                  })
  }

  addVariableIncome(income){
    let url = 'variableIncome/store';

    income.month_id = this.getCurrentMonth().id;

    this.server.post(url, income).subscribe((id) => {
                    income.id = id;
                    this.getCurrentMonth().addVariableIncome(income);
                    this.showToast('Ingreso agregado con éxito');
                  })
  }

  deleteVariableIncome(income){
    let url = 'variableIncome/delete/' + income.id;

    this.server.post(url, income).subscribe(() => {
                    this.getCurrentMonth().deleteVariableIncome(income);
                    this.showToast('Ingreso eliminado con éxito');
                  })
  }

  addFixedOutcome(outcome){
    let url = 'fixedOutcome/store';

    outcome.month_id = this.getCurrentMonth().id;
    var action = outcome.id ? 'modificado' : 'agregado';

    this.server.post(url, outcome).subscribe((id) => {
                    outcome.id = id;
                    this.getCurrentMonth().addFixedOutcome(outcome, outcome.fixed_outcome_type_id);
                    this.showToast('Gasto fijo ' + action + ' con éxito');
                  })
  }

  addClinicIncome(income, clinic_id){
    let url = 'clinic/income/store';

    this.server.post(url, income).subscribe((id) => {
                    income.id = id;
                    this.getCurrentMonth().addClinicIncome(income, clinic_id);
                    this.showToast('Ingreso agregado con éxito');
                  })
  }

  deleteClinicIncome(income, clinic: Clinic){
    let url = 'clinic/income/delete/' + income.id;

    this.server.post(url, income).subscribe(() => {
                    clinic.deleteIncome(income);
                    this.showToast('Ingreso eliminado con éxito');
                  })
  }

  addClinicOutcome(outcome, clinic_id){
    let url = 'clinic/outcome/store';

    outcome.month_id = this.getCurrentMonth().id;

    this.server.post(url, outcome).subscribe((id) => {
                    outcome.id = id;
                    this.getCurrentMonth().addClinicOutcome(outcome, clinic_id);
                    this.showToast('Gasto agregado con éxito');
                  })
  }

  deleteClinicOutcome(outcome, clinic: Clinic){
    let url = 'clinic/outcome/delete/' + outcome.id;

    this.server.post(url, outcome).subscribe(() => {
                    clinic.deleteOutcome(outcome);
                    this.showToast('Gasto eliminado con éxito');
                  })
  }

  addDepartmentIncome(income){
    let url = 'department/income/store';

    income.month_id = this.getCurrentMonth().id;
    var action = income.id ? 'modificado' : 'agregado';

    this.server.post(url, income).subscribe((id) => {
                    income.id = id;
                    this.getCurrentMonth().addDepartmentIncome(income, income.department_id);
                    this.showToast('Alquiler ' + action + ' con éxito');
                  })
  }

  addDollarPurchase(purchase){
    let url = 'dollarPurchase/store';

    purchase.month_id = this.getCurrentMonth().id;

    this.server.post(url, purchase).subscribe((id) => {
                    purchase.id = id;
                    this.getCurrentMonth().addDollarPurchase(purchase);
                    this.showToast('Compra de dólares agregada con éxito');
                  })
  }

  deleteDollarPurchase(purchase: DollarPurchase){
    let url = 'dollarPurchase/delete/' + purchase.id;

    this.server.post(url, purchase).subscribe(() => {
                    this.getCurrentMonth().deleteDollarPurchase(purchase);
                    this.showToast('Compra de dólares eliminada con éxito');
                  })
  }

  editInitialBalance(initial_balance: number){
    let url = 'month/initialBalance/update';

    let data = {
      id: this.getCurrentMonth().id,
      initial_balance: initial_balance
    }

    this.server.post(url, data).subscribe(() => {
                    this.getCurrentMonth().initial_balance = initial_balance;
                    this.showToast('Saldo inicial editado con éxito');
                    this.onDataUpdated();
                  })
  }

  editMonthResult(result){
    let url = 'month/result/store';

    result.month_id = this.getCurrentMonth().id;

    this.server.post(url, result).subscribe((id) => {
                    result.id = id;
                    this.getCurrentMonth().editMonthResult(result);
                    this.showToast('Valor de caja editado con éxito');
                    this.onDataUpdated();
                  })
  }

  addClinic(clinic){
    let url = 'clinic/create';

    this.server.post(url, clinic).subscribe((id) => {
                    clinic.id = id;
                    clinic.deleted = false;
                    this.getCurrentMonth().addClinic(clinic);
                    this.showToast('Clínica agregada con éxito');
                  })
  }

  deleteClinic(clinic: BasicDeletableModel){
    let url = 'clinic/delete/' + clinic.id;

    this.server.post(url, {}).subscribe(() => {
                    clinic.deleted = true;
                    this.showToast('Clínica eliminada con éxito');
                  })
  }

  addDepartment(department){
    let url = 'department/create';

    this.server.post(url, department).subscribe((id) => {
                    department.id = id;
                    department.deleted = false;
                    this.getCurrentMonth().addDepartment(department);
                    this.showToast('Departamento agregado con éxito');
                  })
  }

  deleteDepartment(department: BasicDeletableModel){
    let url = 'department/delete/' + department.id;

    this.server.post(url, {}).subscribe(() => {
                    department.deleted = true;
                    this.showToast('Departamento eliminado con éxito');
                  })
  }

  addFixedOutcomeType(type){
    let url = 'fixedOutcome/type/create';

    this.server.post(url, type).subscribe((id) => {
                    type.id = id;
                    type.deleted = false;
                    this.getCurrentMonth().addFixedOutcomeType(type);
                    this.showToast('Tipo de gasto fijo agregado con éxito');
                  })
  }

  deleteFixedOutcomeType(type: BasicDeletableModel){
    let url = 'fixedOutcome/type/delete/' + type.id;

    this.server.post(url, {}).subscribe(() => {
                    type.deleted = true;
                    this.showToast('Tipo de gasto fijo eliminado con éxito');
                  })
  }

  addVariableOutcomeType(type){
    let url = 'variableOutcome/type/create';

    this.server.post(url, type).subscribe((id) => {
                    type.id = id;
                    type.deleted = false;
                    this.data.addVariableOutcomeType(type);
                    this.showToast('Tipo de gasto variable agregado con éxito');
                  })
  }

  deleteVariableOutcomeType(type: BasicDeletableModel){
    let url = 'variableOutcome/type/delete/' + type.id;

    this.server.post(url, {}).subscribe(() => {
                    type.deleted = true;
                    this.showToast('Tipo de gasto variable eliminado con éxito');
                  })
  }

  addClinicOutcomeType(type){
    let url = 'clinic/outcome/type/create';

    this.server.post(url, type).subscribe((id) => {
                    type.id = id;
                    type.deleted = false;
                    this.data.addClinicOutcomeType(type);
                    this.showToast('Tipo de gasto de clínica agregado con éxito');
                  })
  }

  deleteClinicOutcomeType(type: BasicDeletableModel){
    let url = 'clinic/outcome/type/delete/' + type.id;

    this.server.post(url, {}).subscribe(() => {
                    type.deleted = true;
                    this.showToast('Tipo de gasto de clínica eliminado con éxito');
                  })
  }

  addMonthResultType(type){
    let url = 'month/result/type/create';

    this.server.post(url, type).subscribe((id) => {
                    type.id = id;
                    type.deleted = false;
                    this.getCurrentMonth().addMonthResultType(type);
                    this.showToast('Tipo de caja agregado con éxito');
                  })
  }

  deleteMonthResultType(type: BasicDeletableModel){
    let url = 'month/result/type/delete/' + type.id;

    this.server.post(url, {}).subscribe(() => {
                    type.deleted = true;
                    this.showToast('Tipo de caja eliminado con éxito');
                  })
  }

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: 'toastClass'
    });

    toast.present();
  }

}
