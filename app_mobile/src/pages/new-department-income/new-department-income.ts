import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Department } from '../../models/Department';

@IonicPage()
@Component({
  selector: 'page-new-department-income',
  templateUrl: 'new-department-income.html',
})
export class NewDepartmentIncomePage {

  departments: Array<Department>;
  selectedDepartment: number;
  amount: number;
  id: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    var department : Department = this.navParams.get('department');
    if (department){
      this.id = department.department_incomes[0].id;
      this.selectedDepartment = department.id;
      this.amount = department.department_incomes[0].amount;
    }

    this.departments = this.apiProvider.getCurrentMonth().departments
                              .filter(function(element){
                                return (!element.deleted && element.department_incomes.length == 0) || (department && element.id == department.id);
                              }.bind(this));
  }

  submit(){
    let income = {
      id: this.id,
      amount: Number(this.amount),
      department_id: this.selectedDepartment
    };

    this.apiProvider.addDepartmentIncome(income);
    this.navCtrl.pop();
  }

}
