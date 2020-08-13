import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-combinazione',
  templateUrl: './combinazione.page.html',
  styleUrls: ['./combinazione.page.scss'],
})
export class CombinazionePage implements OnInit {

	excluir: any = [];
	incluir: any = [];
	combinacion: any = [];
	ultimos: any[3] = [];
	fechas: any[3] = [];
	usuario: string = localStorage.getItem('correo');
	hoy: any = moment();
	contador: number = parseInt(JSON.parse(localStorage.getItem('contador')));

	meses = ['gennaio',
			'febbraio',
			'marzo',
			'aprile',
			'maggio',
			'giugno',
			'luglio',
			'agosto',
			'settembre',
			'ottobre',
			'novembre',
			'dicembre'];


  constructor(private service: ComunicacionService) {

  	if (!this.contador) {
  		this.contador = 0;
  	}

  	this.hoy = this.hoy.format('DD') + ' ' + this.meses[ this.hoy.format('M')-1 ] + ' ' + this.hoy.format('YYYY');

  }

  ngOnInit() {

  	this.service.changeData(this.usuario);

  	if (localStorage.getItem('excluidos') && localStorage.getItem('excluidos') != undefined) {
  		
  		this.excluir = JSON.parse(localStorage.getItem('excluidos'));
  	
  	}else{
  		
  		localStorage.setItem('excluidos', JSON.stringify(this.excluir));

  	}

  	if (localStorage.getItem('combinacion') && localStorage.getItem('combinacion') != undefined) {
  		
  		this.combinacion = JSON.parse(localStorage.getItem('combinacion'));
  	
  	}else{
  		
  		localStorage.setItem('combinacion', JSON.stringify(this.combinacion));

  	}

  	if (localStorage.getItem('incluidos') && localStorage.getItem('incluidos') != undefined) {
  		
  		this.incluir = JSON.parse(localStorage.getItem('incluidos'));

  	}else{

  		localStorage.setItem('incluidos', JSON.stringify(this.incluir));

  	}

  	if (localStorage.getItem('ufechas') && localStorage.getItem('ufechas') != undefined) {

  		this.fechas = JSON.parse(localStorage.getItem('ufechas'));
  	
  	}else{

  		this.fechas = [];
  		localStorage.setItem('ufechas', JSON.stringify(this.fechas));

  	}

  	if (localStorage.getItem('ultimos') && localStorage.getItem('ultimos') != undefined) {

  		this.ultimos = JSON.parse(localStorage.getItem('ultimos'));
  	
  	}else{

  		this.ultimos = [];
  		localStorage.setItem('ultimos', JSON.stringify(this.ultimos));

  	}

  }

  getRandomArbitrary(min, max, n:any = [], exc:any = []){

	let number = Math.floor(Math.random() * (max - min) + min);
	let a = 0;

  	for (let i = 0; i < n.length; i++) {
  		if (n[i] == number) {
  			a++;
  		}
  	}

  	for (let i = 0; i < exc.length; i++) {
  		if (exc[i] == number) {
  			a++;
  		}
  	}

  	if (a > 0) {
  		return this.getRandomArbitrary(min,max,n);
  	}else{
  		return number;
  	}

  }

  random(){

		this.combinacion = [];
		let omitir = [];

		// if (localStorage.getItem('ultimos') && localStorage.getItem('fechas')) {

		// 	this.ultimos = JSON.parse(localStorage.getItem('ultimos'));
		// 	//this.fechas = JSON.parse(localStorage.getItem('fechas'));

		// }
		if (this.incluir) {
			for (let h in this.incluir) {
				this.combinacion.push(this.incluir[h]);
			}
		}

		for (var i = 0; i < (5 - this.incluir.length); i++) {	
			this.combinacion.push( this.getRandomArbitrary(1,55, this.combinacion, this.excluir) );
		}

		this.combinacion = this.combinacion.sort((a,b)=> a - b);

		// this.ultimos = JSON.parse(localStorage.getItem('ultimos'));

		/*

		if (this.incluir == undefined) {

				//omitir.push(this.excluir[0], this.excluir[1]);

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

		}*/

		if (this.ultimos.length == 3 && this.fechas.length == 3) {
			
			// let datos = [this.ultimos[1], this.ultimos[2]];
			// let datos2 = [this.fechas[1], this.fechas[2]];

			// this.ultimos = [this.combinacion, datos[1], datos[0]];
			// this.fechas = [this.hoy, datos2[1], datos2[0]];

			this.fechas.shift();
			this.ultimos.shift();

		}/*else if (this.ultimos.length == 2 && this.fechas.length == 2) {

			let datos = [this.ultimos[0], this.ultimos[1]];
			let datos2 = [this.fechas[0], this.fechas[1]];

			this.ultimos = [this.combinacion, datos[1], datos[0]];
			this.fechas = [this.hoy, datos2[1], datos2[0]];

		}else if (!this.ultimos[0] && !this.fechas[0]) {

			this.ultimos.push(this.combinacion);
			this.fechas.push(this.hoy);

		}else{

			let datos = [this.ultimos[0]];
			let datos2 = [this.fechas[0]];

			this.ultimos = [this.combinacion, datos[0]];
			this.fechas = [this.hoy, datos2[0]];

		}*/

		this.ultimos.push(this.combinacion);
		this.fechas.push(this.hoy);
		

		localStorage.setItem('combinacion', JSON.stringify(this.combinacion));
		localStorage.setItem('ultimos', JSON.stringify(this.ultimos.reverse()));
		localStorage.setItem('ufechas', JSON.stringify(this.fechas.reverse()));
		this.contador++;
		localStorage.setItem('contador', JSON.stringify(this.contador));
		localStorage.setItem('horaClick',moment().format('YYYY-MM-DD HH:mm:ss'));

	}

}
