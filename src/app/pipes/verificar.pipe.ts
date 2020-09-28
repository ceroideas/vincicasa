import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verificar'
})
export class VerificarPipe implements PipeTransform {

  transform(value: unknown, combinacion, checks = false): unknown {
  	if (checks) {
  		return combinacion.findIndex(x=>x==value) != -1;
  	}
    return combinacion.find(x => x == value);
  }

}
