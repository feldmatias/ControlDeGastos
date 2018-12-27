import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber',
})
export class RoundNumberPipe implements PipeTransform {
  
  transform(value: number) {
    return Math.round(value);
  }
}
