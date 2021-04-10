import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { Department } from '../../models/Department';
import { NewDepartmentIncomePage } from '../new-department-income/new-department-income';

@IonicPage()
@Component({
  selector: 'page-department-incomes',
  templateUrl: 'department-incomes.html',
})
export class DepartmentIncomesPage extends BasicListPage{

  departments: Array<Department>;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    super(apiProvider);
  }

  updateData(){
    this.departments = this.apiProvider.getCurrentMonth().departments;
  }

  newIncome(){
    this.navCtrl.push(NewDepartmentIncomePage);
  }

  edit(department: Department){
    this.navCtrl.push(NewDepartmentIncomePage, {department: department});
  }

  hasIncomes(){
    return this.departments.some(function(element){
      return element.department_incomes.length > 0;
    });
  }

}
