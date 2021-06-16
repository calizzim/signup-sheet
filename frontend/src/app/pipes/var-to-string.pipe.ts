import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'varToString'
})
export class VarToStringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let returnString = '';
    for(let c of value) {
      if(c.toUpperCase() == c) returnString += ' ' + c;
      else returnString += c;
    }
    return returnString[0].toUpperCase() + returnString.substr(1);
  }

}
