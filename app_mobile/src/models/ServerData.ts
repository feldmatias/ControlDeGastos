import { BasicModel } from './BasicModel';
import { BasicMonth, Month } from './Month';
import { VariableOutcomeType } from './VariableOutcome';
import { ClinicOutcomeType } from './Clinic';

export class ServerData extends BasicModel{
  clinic_outcome_types: Array<ClinicOutcomeType>;
  variable_outcome_types: Array<VariableOutcomeType>;
  month: Month;
  months: Array<BasicMonth>;

  init(){
    this.months = this.months.map((month) => new BasicMonth(month));
    this.month = new Month(this.month);
    this.variable_outcome_types = this.variable_outcome_types.map((type) => new VariableOutcomeType(type));
    this.clinic_outcome_types = this.clinic_outcome_types.map((type) => new ClinicOutcomeType(type));
  }

  addVariableOutcomeType(type){
    let index = this.variable_outcome_types.findIndex(function(element){
          return element.id == type.id;
        });

    if (index >= 0){
      this.variable_outcome_types[index].deleted = false;
    } else {
      this.variable_outcome_types.push(new VariableOutcomeType(type));
    }
  }

  addClinicOutcomeType(type){
    let index = this.clinic_outcome_types.findIndex(function(element){
          return element.id == type.id;
        });

    if (index >= 0){
      this.clinic_outcome_types[index].deleted = false;
    } else {
      this.clinic_outcome_types.push(new ClinicOutcomeType(type));
    }
  }

}