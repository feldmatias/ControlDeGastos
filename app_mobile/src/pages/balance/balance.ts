import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BasicListPage } from '../BasicListPage';
import { ApiProvider } from '../../providers/api/api';
import { Month } from '../../models/Month';
import { MonthResultType } from '../../models/MonthResult';
import { MonthBalance } from '../../models/MonthBalance';
import { EditInitialBalancePage } from '../edit-initial-balance/edit-initial-balance';
import { EditMonthResultPage } from '../edit-month-result/edit-month-result';

@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage extends BasicListPage{

  month_results: Array<MonthResultType>;
  merged_month_balance: MonthBalance;
  month_merged: boolean;
  previous_month_merged: boolean;
  month_is_current: boolean;

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
  total_cash_resgister: number = 0;

  initial_balance: number = 0;
  registered_total: number = 0;
  difference: number = 0;
  earnings: number = 0;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    super(apiProvider);
  }

  updateData(){
    var current_month : Month = this.apiProvider.getCurrentMonth();
    this.month_merged = current_month.merge_with_next_month;
    this.previous_month_merged = current_month.merged_previous_month;
    this.merged_month_balance = current_month.merged_month_data;
    this.month_is_current = current_month.current;

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

  mergeWithNextMonth(){
    this.apiProvider.mergeMonthWithNext();
  }

  unmergeWithNextMonth(){
    this.apiProvider.unmergeMonthWithNext();
  }

  private calculate_initial_balance(current_month: Month){
    if (current_month.initial_balance){
      this.initial_balance = current_month.initial_balance;
    } else if (current_month.merged_previous_month) {
      this.initial_balance = this.merged_month_balance.initial_balance;
    } else {
      this.initial_balance = current_month.calculated_initial_balance;
    }
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

    this.total_incomes = this.total_clinic_incomes + this.total_department_incomes - this.total_clinic_outcomes 
        + this.total_variable_incomes + this.merged_month_balance.incomes;
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

    this.total_outcomes = this.total_fixed_outcomes + this.total_variable_outcomes 
        + this.total_extra_outcomes + this.merged_month_balance.outcomes;
  }

  private calculate_month_results(current_month: Month){
    this.month_results = current_month.results;

    this.total_dollar_purchases = current_month.dollar_purchases
        .reduce(function(total, purchase){
          return total + purchase.pesos_amount;
        }, 0);

    this.total_month_results = this.month_results.reduce(function(total, result){
          return total + result.amount;
        }, 0);

    this.total_cash_resgister = this.total_dollar_purchases + this.total_month_results + this.merged_month_balance.dollars;
  }

  private calculate_difference(){
    this.registered_total = this.initial_balance + this.total_incomes - this.total_outcomes;

    this.difference = this.registered_total - this.total_cash_resgister;

    this.earnings = this.total_cash_resgister - this.initial_balance + this.total_outcomes;
  }

}
