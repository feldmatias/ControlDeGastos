import { BasicDeletableModel, BasicAmountModel } from './BasicModel';

export class FixedOutcomeType extends BasicDeletableModel{
  fixed_outcomes: Array<FixedOutcome>;

  init(){
    this.fixed_outcomes = this.fixed_outcomes ? this.fixed_outcomes.map((outcome) => new FixedOutcome(outcome)) : [];
  }
}

export class FixedOutcome extends BasicAmountModel{

}