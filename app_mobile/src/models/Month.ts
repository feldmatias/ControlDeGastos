import { BasicModel } from './BasicModel';
import { FixedOutcomeType, FixedOutcome } from './FixedOutcome';
import { VariableOutcome } from './VariableOutcome';
import { VariableIncome } from './VariableIncome';
import { Department, DepartmentIncome } from './Department';
import { Clinic, ClinicIncome, ClinicOutcome } from './Clinic';
import { DollarPurchase } from './DollarPurchase';
import { MonthResultType, MonthResult } from './MonthResult';
import { MonthBalance } from './MonthBalance';
import * as moment from 'moment';

export class BasicMonth extends BasicModel{
  id: number;
  year: number;
  month: number;
  display_name: string;
  can_edit: boolean;
  current_days: number;
  current: boolean;
  start_date: moment.Moment;
  end_date: moment.Moment;

  init(){
    this.display_name = moment(this.year.toString() + '-' + this.month.toString() + '-01', 'YYYY-MM-DD').format('MMMM YYYY');

    this.end_date = moment(this.year.toString() + '-' + this.month.toString() + '-01', 'YYYY-MM-DD').endOf('month');
    this.start_date = this.end_date.clone().startOf('month');
    
    this.can_edit = this.end_date.clone().add(1, 'months') >= moment();

    this.current_days = this.end_date < moment() ? this.end_date.date() : moment().date();

    this.current = moment() <= this.end_date;
  }
}

export class Month extends BasicMonth{
  initial_balance: number;
  calculated_initial_balance: number;
  merge_with_next_month: boolean;
  merged_previous_month: boolean;
  merged_month_data: MonthBalance;

  fixed_outcomes: Array<FixedOutcomeType>;
  variable_outcomes: Array<VariableOutcome>;
  variable_incomes: Array<VariableIncome>;
  departments: Array<Department>;
  clinics: Array<Clinic>;
  dollar_purchases: Array<DollarPurchase>;
  results: Array<MonthResultType>;

  init(){
    super.init();
    this.merged_month_data = new MonthBalance(this.merged_month_data);
    this.fixed_outcomes = this.fixed_outcomes.map((outcome) => new FixedOutcomeType(outcome));
    this.variable_outcomes = this.variable_outcomes.map((outcome) => new VariableOutcome(outcome));
    this.variable_incomes = this.variable_incomes.map((income) => new VariableIncome(income));
    this.departments = this.departments.map((department) => new Department(department));
    this.clinics = this.clinics.map((clinic) => new Clinic(clinic));
    this.dollar_purchases = this.dollar_purchases.map((purchase) => new DollarPurchase(purchase));
    this.results = this.results.map((result) => new MonthResultType(result));
  }

  addVariableOutcome(outcome){
    this.variable_outcomes.unshift(new VariableOutcome(outcome));
  }

  deleteVariableOutcome(outcome: VariableOutcome){
    let index = this.variable_outcomes.findIndex(function(element){
          return element.id == outcome.id;
        });

    this.variable_outcomes.splice(index, 1);
  }

  addVariableIncome(income){
    this.variable_incomes.unshift(new VariableIncome(income));
  }

  deleteVariableIncome(income: VariableIncome){
    let index = this.variable_incomes.findIndex(function(element){
          return element.id == income.id;
        });

    this.variable_incomes.splice(index, 1);
  }

  addFixedOutcome(outcome, type_id){
    let index = this.fixed_outcomes.findIndex(function(element){
          return element.id == type_id;
        });

    this.fixed_outcomes[index].fixed_outcomes = [new FixedOutcome(outcome)];
  }

  addDepartmentIncome(income, department_id){
    let index = this.departments.findIndex(function(element){
          return element.id == department_id;
        });

    this.departments[index].department_incomes = [new DepartmentIncome(income)];
  }

  addClinicIncome(income, clinic_id){
    let index = this.clinics.findIndex(function(element){
          return element.id == clinic_id;
        });

    this.clinics[index].clinic_incomes.push(new ClinicIncome(income));

    this.clinics[index].clinic_incomes.sort(function(a, b){
      if (a.date < b.date){
        return 1;
      }
      if (a.date > b.date){
        return -1;
      }
      return 0;
    })
  }

  addClinicOutcome(outcome, clinic_id){
    let index = this.clinics.findIndex(function(element){
          return element.id == clinic_id;
        });

    this.clinics[index].clinic_outcomes.push(new ClinicOutcome(outcome));
  }

  addDollarPurchase(purchase){
    this.dollar_purchases.push(new DollarPurchase(purchase));
  }

  deleteDollarPurchase(purchase: DollarPurchase){
    let index = this.dollar_purchases.findIndex(function(element){
          return element.id == purchase.id;
        });

    this.dollar_purchases.splice(index, 1);
  }

  editMonthResult(result){
    let index = this.results.findIndex(function(element){
          return element.id == result.month_result_value_id;
        });

    this.results[index].editResult(new MonthResult(result));
  }

  addClinic(clinic){
    let index = this.clinics.findIndex(function(element){
          return element.id == clinic.id;
        });

    if (index >= 0){
      this.clinics[index].deleted = false;
    } else {
      this.clinics.push(new Clinic(clinic));
    }
  }

  addDepartment(department){
    let index = this.departments.findIndex(function(element){
          return element.id == department.id;
        });

    if (index >= 0){
      this.departments[index].deleted = false;
    } else {
      this.departments.push(new Department(department));
    }
  }

  addFixedOutcomeType(type){
    let index = this.fixed_outcomes.findIndex(function(element){
          return element.id == type.id;
        });

    if (index >= 0){
      this.fixed_outcomes[index].deleted = false;
    } else {
      this.fixed_outcomes.push(new FixedOutcomeType(type));
    }
  }

  addMonthResultType(type){
    let index = this.results.findIndex(function(element){
          return element.id == type.id;
        });

    if (index >= 0){
      this.results[index].deleted = false;
    } else {
      this.results.push(new MonthResultType(type));
    }
  }
}