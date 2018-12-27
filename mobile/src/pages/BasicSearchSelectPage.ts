import { IonicSelectableComponent } from 'ionic-selectable';
import { BasicDeletableModel } from '../models/BasicModel';

export abstract class BasicSearchSelectPage{

  abstract types: Array<BasicDeletableModel>;
  abstract type: string;
  abstract type_name: string;

  other_type_name: string = 'Otro...';

  constructor() {
  }

  getTypeName(){
    return this.type == this.other_type_name ? this.type_name : this.type;
  }

  onSelectSearch(event: {component: IonicSelectableComponent, text: string }) {
    var text = event.text.toLowerCase();
    var types = this.types
        .filter(function(type){
          return type.name == this.other_type_name || type.name.toLowerCase().includes(text);
        }.bind(this));

    event.component.items = types;
  }

  onSelectClosed(event: {component: IonicSelectableComponent }) {
      this.type_name = event.component.searchText;
  }

}