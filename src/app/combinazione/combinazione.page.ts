import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-combinazione',
  templateUrl: './combinazione.page.html',
  styleUrls: ['./combinazione.page.scss'],
})
export class CombinazionePage implements OnInit {

	excluir: any = [JSON.parse(localStorage.getItem('excluir'))];
	incluir: any = [JSON.parse(localStorage.getItem('incluir'))];
	combinacion: any = JSON.parse(localStorage.getItem('combinacion'));
	utl: any = [];
	utl2: any = [];
	utl3: any = [];
	ultimos: any = [this.utl, this.utl2, this.utl3];
	arrays: any = [];
	fechas: any = [];
	usuario: string = localStorage.getItem('correo');

  constructor(private service: ComunicacionService) { }

  ngOnInit() {
  	this.service.changeData(this.usuario);
  	this.arrays.push(this.utl, this.utl2, this.utl3);
  }

  getRandomArbitrary(min, max){
		return Math.random() * (max - min) + min;
	}

  random(event){

		this.combinacion = [];
		let omitir = [];

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

			if (this.ultimos.utl =! undefined) {

				this.ultimos.utl.push(this.combinacion);
				this.fechas.push(new Date);
				localStorage.setItem('fechas', JSON.stringify(new Date));
				localStorage.setItem('ultimos', JSON.stringify(this.ultimos));

			}else if (this.ultimos.utl2 =! undefined) {
				
				this.ultimos.utl2.push(this.combinacion);
				this.fechas.push(new Date);
				localStorage.setItem('fechas', JSON.stringify(new Date));
				localStorage.setItem('ultimos', JSON.stringify(this.ultimos));

			}else{

				this.ultimos.utl3.push(this.combinacion);
				this.fechas.push(new Date);
				localStorage.setItem('fechas', JSON.stringify(new Date));
				localStorage.setItem('ultimos', JSON.stringify(this.ultimos));

			}
			
			localStorage.setItem('combinacion', JSON.stringify(this.combinacion));

	}

}
