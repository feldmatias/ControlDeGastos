import { BasicDeletableModel, BasicAmountModel } from './BasicModel';

export class Department extends BasicDeletableModel{
  department_incomes: Array<DepartmentIncome>;

  init(){
    this.department_incomes = this.department_incomes ? this.department_incomes.map((income) => new DepartmentIncome(income)) : [];
  }
}

export class DepartmentIncome extends BasicAmountModel{

}