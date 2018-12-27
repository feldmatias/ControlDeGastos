import { BasicDeletableModel, BasicAmountModel } from './BasicModel';

export class VariableOutcomeType extends BasicDeletableModel{

}

export class VariableOutcome extends BasicAmountModel{
  type: string;
  extra: boolean;
  created_at: string;
}