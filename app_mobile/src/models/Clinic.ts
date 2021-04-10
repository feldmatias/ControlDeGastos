import { BasicDeletableModel, BasicAmountModel } from './BasicModel';
import * as moment from 'moment';

export class Clinic extends BasicDeletableModel{
  clinic_incomes: Array<ClinicIncome>;
  clinic_outcomes: Array<ClinicOutcome>;

  init(){
    this.clinic_incomes = this.clinic_incomes ? this.clinic_incomes.map((income) => new ClinicIncome(income)) : [];
    this.clinic_outcomes = this.clinic_outcomes ? this.clinic_outcomes.map((outcome) => new ClinicOutcome(outcome)) : [];
  }

  getIncomesTotal(){
    return this.clinic_incomes.reduce(function(total, income){
      return total + income.amount;
    }, 0);
  }

  deleteIncome(income){
    let index = this.clinic_incomes.findIndex(function(element){
          return element.id == income.id;
        });

    this.clinic_incomes.splice(index, 1);
  }

  deleteOutcome(outcome){
    let index = this.clinic_outcomes.findIndex(function(element){
          return element.id == outcome.id;
        });

    this.clinic_outcomes.splice(index, 1);
  }
}

export class ClinicIncome extends BasicAmountModel{
  date: string;
  moment_date: moment.Moment;

  init(){
    this.moment_date = moment(this.date);
  }
}

export class ClinicOutcome extends BasicAmountModel{
  type: string;
}

export class ClinicOutcomeType extends BasicDeletableModel{
  
}