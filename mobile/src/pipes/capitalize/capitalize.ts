import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  
  transform(value: string) {
    if (!value) return value;
    if (typeof value !== 'string') {
      return value;
    }

    return value.replace(/\w\S*/g, (word => titleCaseWord(word)));

    function titleCaseWord(word: string) {
      if (!word) return word;
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  }
}
