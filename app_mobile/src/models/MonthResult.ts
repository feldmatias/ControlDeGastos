import { BasicDeletableModel, BasicAmountModel } from './BasicModel';

export class MonthResultType extends BasicDeletableModel{
  month_results: Array<MonthResult>;
  amount: number;

  init(){
    this.month_results = this.month_results ? this.month_results.map((result) => new MonthResult(result)) : [];
    this.calculateAmount();
  }

  editResult(result: MonthResult){
    this.month_results = [result];
    this.calculateAmount();
  }

  private calculateAmount(){
    this.amount = this.month_results.reduce(function(total, element){
      return total + element.amount;
    }, 0);
  }
}

export class MonthResult extends BasicAmountModel{

}