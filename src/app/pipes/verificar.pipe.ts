import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verificar'
})
export class VerificarPipe implements PipeTransform {

  transform(value: unknown, combinacion): unknown {
    return combinacion.find(x => x == value);
  }

}
