import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { Month } from '../../models/Month';
import { MonthResultType } from '../../models/MonthResult';
import { EditInitialBalancePage } from '../edit-initial-balance/edit-initial-balance';
import { EditMonthResultPage } from '../edit-month-result/edit-month-result';

@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage extends BasicListPage{

  month_results: Array<MonthResultType>;

  total_clinic_incomes: number = 0;
  total_clinic_outcomes: number = 0;
  total_department_incomes: number = 0;
  total_variable_incomes: number = 0;
  total_incomes: number = 0;

  total_fixed_outcomes: number = 0;
  total_variable_outcomes: number = 0;
  total_extra_outcomes: number = 0;
  total_outcomes: number = 0;

  total_dollar_purchases: number = 0;
  total_month_results: number = 0;

  initial_balance: number = 0;
  registered_total: number = 0;
  difference: number = 0;
  earnings: number = 0;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    super(apiProvider);
  }

  updateData(){
    var current_month : Month = this.apiProvider.getCurrentMonth();

    this.calculate_initial_balance(current_month);
    this.calculate_incomes(current_month);
    this.calculate_outcomes(current_month);
    this.calculate_month_results(current_month);
    this.calculate_difference();
  }

  editInitialBalance(){
    this.navCtrl.push(EditInitialBalancePage);
  }

  editMonthResult(result: MonthResultType){
    this.navCtrl.push(EditMonthResultPage, {result: result});
  }

  private calculate_initial_balance(current_month: Month){
    this.initial_balance = current_month.initial_balance ? current_month.initial_balance : current_month.calculated_initial_balance;
  }

  private calculate_incomes(current_month: Month){
    this.total_clinic_incomes = current_month.clinics
        .reduce(function(total, clinic){
          return total + clinic.clinic_incomes.reduce(function(subtotal, income){
            return subtotal + income.amount;
          }, 0)
        }, 0);

    this.total_clinic_outcomes = current_month.clinics
        .reduce(function(total, clinic){
          return total + clinic.clinic_outcomes.reduce(function(subtotal, outcome){
            return subtotal + outcome.amount;
          }, 0)
        }, 0);

    this.total_department_incomes = current_month.departments
        .reduce(function(total, department){
          return total + department.department_incomes.reduce(function(subtotal, income){
            return subtotal + income.amount;
          }, 0)
        }, 0);

    this.total_variable_incomes = current_month.variable_incomes
        .reduce(function(total, variable_income){
          return total + variable_income.amount;
        }, 0);

    this.total_incomes = this.total_clinic_incomes + this.total_department_incomes - this.total_clinic_outcomes + this.total_variable_incomes;
  }

  private calculate_outcomes(current_month: Month){
    this.total_fixed_outcomes = current_month.fixed_outcomes
        .reduce(function(total, fixed_outcome_type){
          return total + fixed_outcome_type.fixed_outcomes.reduce(function(subtotal, outcome){
            return subtotal + outcome.amount;
          }, 0)
        }, 0);

    this.total_variable_outcomes = current_month.variable_outcomes
        .reduce(function(total, variable_outcome){
          return variable_outcome.extra ? total : total + variable_outcome.amount;
        }, 0);

    this.total_extra_outcomes = current_month.variable_outcomes
        .reduce(function(total, variable_outcome){
          return variable_outcome.extra ? total + variable_outcome.amount : total;
        }, 0);

    this.total_outcomes = this.total_fixed_outcomes + this.total_variable_outcomes + this.total_extra_outcomes;
  }

  private calculate_month_results(current_month: Month){
    this.month_results = current_month.results;

    this.total_dollar_purchases = current_month.dollar_purchases
        .reduce(function(total, purchase){
          return total + purchase.pesos_amount;
        }, 0);

    this.total_month_results = this.month_results.reduce(function(total, result){
          return total + result.amount;
        }, this.total_dollar_purchases);
  }

  private calculate_difference(){
    this.registered_total = this.initial_balance + this.total_incomes - this.total_outcomes;

    this.difference = this.registered_total - this.total_month_results;

    this.earnings = this.total_month_results - this.initial_balance + this.total_outcomes;
  }

}
