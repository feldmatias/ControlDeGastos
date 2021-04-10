export abstract class BasicModel {
  constructor(data : any) {
    for(let propertyName in data) {
      try {
        this[propertyName] = data[propertyName];
      }
      catch(ex){
      }
    }
    this.init();
  }

  init(){
  };

}

export class BasicDeletableModel extends BasicModel{
  id: number;
  name: string;
  deleted: boolean;
}

export class BasicAmountModel extends BasicModel{
  id: number;
  amount: number;
}