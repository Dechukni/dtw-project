import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minimum'
})
export class MinimumPipe implements PipeTransform {

  transform(value: Array<number>): any {
    return Math.min(...value);
  }

}
