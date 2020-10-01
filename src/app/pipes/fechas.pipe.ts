import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fechas'
})
export class FechasPipe implements PipeTransform {

  transform(f: unknown, tipo = null): unknown {

  	let meses = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];

  	f = f.toString();

  	let y = f[0]+f[1]+f[2]+f[3];
  	let m = f[4]+f[5];
  	let d = f[6]+f[7];

  	if (tipo == 'dia') {
  		return moment(y + '-' + m + '-' + d).day();
  	}

    return d+' '+meses[m-1]+' '+y;
  }

}
