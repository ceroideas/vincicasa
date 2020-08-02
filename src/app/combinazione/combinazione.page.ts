import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-combinazione',
  templateUrl: './combinazione.page.html',
  styleUrls: ['./combinazione.page.scss'],
})
export class CombinazionePage implements OnInit {

	excluir: any;
	incluir: any = JSON.parse(localStorage.getItem('incluidos'));
	combinacion: any = JSON.parse(localStorage.getItem('combinacion'));
	ultimos: any[3];
	fechas: any[3]; 
	usuario: string = localStorage.getItem('correo');
	hoy: any = moment().format('DD') + '/' + moment().format('MM') + '/' + moment().format('YYYY');

  constructor(private service: ComunicacionService) { }

  ngOnInit() {

  	this.service.changeData(this.usuario);

  	if (localStorage.getItem('excluidos') && localStorage.getItem('excluidos') != undefined) {
  		this.excluir = JSON.parse(localStorage.getItem('excluidos'));
  	}
  	if (localStorage.getItem('excluidos') && localStorage.getItem('incluidos') != undefined) {
  		this.incluir = JSON.parse(localStorage.getItem('incluidos'));
  	}
  	if (localStorage.getItem('ufechas') && localStorage.getItem('ufechas') != undefined) {
  		this.fechas = localStorage.getItem('ufechas');
  	}

  }

  getRandomArbitrary(min, max){
		return Math.random() * (max - min) + min;
	}

  random(){

		this.combinacion = [];
		let omitir = [];

		if (localStorage.getItem('ultimos') && localStorage.getItem('fechas')) {

			this.ultimos = JSON.parse(localStorage.getItem('ultimos'));
			//this.fechas = JSON.parse(localStorage.getItem('fechas'));

		}

		//this.ultimos = JSON.parse(localStorage.getItem('ultimos'));

		if (this.incluir == undefined) {

				omitir.push(this.excluir[0], this.excluir[1]);

				if (this.incluir[0] != 0) {

					this.combinacion.push(this.incluir[0]);
					let i = 0;
					let x = 0;
					let y = 0;
					let z = 0;

					i = parseInt(this.getRandomArbitrary(1,55));
					y = parseInt(this.getRandomArbitrary(1,55));
					x = parseInt(this.getRandomArbitrary(1,55));
					z = parseInt(this.getRandomArbitrary(1,55));

					this.combinacion.push(i, x, y, z);
					let indice = this.combinacion.length, temporaryValue, randomIndex;

					while(0 !== indice){

						randomIndex = Math.floor(Math.random() * indice);
						indice -= 1;
						temporaryValue = this.combinacion[indice];
						this.combinacion[indice] = this.combinacion[randomIndex];
						this.combinacion[randomIndex] = temporaryValue;

					}
					 
					const array = this.combinacion.sort((a, b) => a - b);
					const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
					localStorage.setItem('numero', numero);
					//return alert(numero);

				}else{

					this.combinacion.push(this.incluir[1]);
					let i = 0;
					let x = 0;
					let y = 0;
					let z = 0;

					i = parseInt(this.getRandomArbitrary(1,55));
					y = parseInt(this.getRandomArbitrary(1,55));
					x = parseInt(this.getRandomArbitrary(1,55));
					z = parseInt(this.getRandomArbitrary(1,55));

					this.combinacion.push(i, x, y, z);
					let indice = this.combinacion.length, temporaryValue, randomIndex;

					while(0 !== indice){

						randomIndex = Math.floor(Math.random() * indice);
						indice -= 1;
						temporaryValue = this.combinacion[indice];
						this.combinacion[indice] = this.combinacion[randomIndex];
						this.combinacion[randomIndex] = temporaryValue;

					}
					 
					const array = this.combinacion.sort((a, b) => a - b);
					const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
					localStorage.setItem('numero', numero);
					//return alert(numero);

				}

			}else if (this.incluir[0] == undefined && this.incluir[1] == undefined) {

				omitir.push(this.excluir[0], this.excluir[1]);
				let a = 0;
				let i = 0;
				let x = 0;
				let y = 0;
				let z = 0;

				a = parseInt(this.getRandomArbitrary(1,55));
				i = parseInt(this.getRandomArbitrary(1,55));
				y = parseInt(this.getRandomArbitrary(1,55));
				x = parseInt(this.getRandomArbitrary(1,55));
				z = parseInt(this.getRandomArbitrary(1,55));

				this.combinacion.push(a,i, x, y, a);

				const array = this.combinacion.sort((a, b) => a - b);
				const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
				localStorage.setItem('numero', numero);
				//return alert(numero);

			}else{

				omitir.push(this.excluir[0], this.excluir[1]);
				this.combinacion.push(this.incluir[0], this.incluir[1]);
				let i = 0;
				let x = 0;
				let y = 0;

				i = parseInt(this.getRandomArbitrary(1,55));
				y = parseInt(this.getRandomArbitrary(1,55));
				x = parseInt(this.getRandomArbitrary(1,55));
				this.combinacion.push(i, x, y);

				let indice = this.combinacion.length, temporaryValue, randomIndex;

				while(0 !== indice){

					randomIndex = Math.floor(Math.random() * indice);
					indice -= 1;
					temporaryValue = this.combinacion[indice];
					this.combinacion[indice] = this.combinacion[randomIndex];
					this.combinacion[randomIndex] = temporaryValue;

				}
			 
				const array = this.combinacion.sort((a, b) => a - b);
				const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
				localStorage.setItem('numero', numero);
				//return alert(numero);

			}

			localStorage.removeItem('combinacion');
			localStorage.setItem('combinacion', JSON.stringify(this.combinacion));
			localStorage.setItem('ultimos', JSON.stringify(this.combinacion));
			this.fechas.push(this.hoy.toString());
			localStorage.setItem('ufechas', JSON.stringify(this.fechas));

	}

}
