import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disabled'
})
export class DisabledPipe implements PipeTransform {

  transform(value: unknown): unknown {
  	if (localStorage.getItem('incluidos')) {
  		let numbers = JSON.parse(localStorage.getItem('incluidos'));

  		for(let i in numbers){
  			if (numbers[i] == value) {
  				return true;
  			}
  		}
  	}

    return false;
  }

}
