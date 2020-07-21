import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'combinazione'
})
export class CombinazionePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
