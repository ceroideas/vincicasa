import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-nautomaticos',
	templateUrl: './nautomaticos.page.html',
	styleUrls: ['./nautomaticos.page.scss'],
})
export class NautomaticosPage implements OnInit {

	n1: string = localStorage.getItem('excluir');
	exc1: number = +this.n1;
	n2: string = localStorage.getItem('excluir2');
	exc2: number = +this.n2;
	n3: string = localStorage.getItem('incluir');
	inc1: number = +this.n3;
	n4: string = localStorage.getItem('incluir2');
	inc2: number = +this.n4;
	//hoy: string = localStorage.getItem('fhoy');

	constructor() { }

	ngOnInit() {
	}

	getRandomArbitrary(min, max){
		return Math.random() * (max - min) + min;
	}

	validar(array){
		const colores = ['Combinación probable: Verde', 'Combinación poco probable: Amarillo', 'Combinación difícilmente probable: Rojo'];
		if (array[1] == array[0] + 1 && array[2] == array[1] + 1 || array[2] == array[1] + 1 && array[3] == array[2] + 1 || array[3] == array[2] + 1 && array[4] == array[3] + 1) {
			
			alert(colores[1]);

		}else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[3] == array[2] + 1  || array[2] == array[1] + 1 && array[3] == array[2] + 1 && array[4] == array[3] + 1) {
			
			alert(colores[1]);

		}else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[4] == array[3] + 1 || array[4] == array[3] + 1 && array[3] == array[2] + 1 && array[1] == array[0] + 1) {

			alert(colores[2]);

		}else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[3] == array[2] + 1 || array[4] == array[3] + 1 && array[3] == array[2] + 1 && array[2] == array[1] + 1) {
						
			alert(colores[2]);

		}else if (array[1] == array[0] + 2 && array[2] == array[1] + 2 && array[3] == array[2] + 2 || array[4] == array[3] + 2 && array[3] == array[2] + 2 && array[2] == array[1] + 2) {
						
			alert(colores[2]);

		}else if (array[1] == array[0] + 3 && array[2] == array[1] + 3 || array[4] == array[3] + 3 && array[3] == array[2] + 3) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 4 && array[2] == array[1] + 4 && array[3] == array[2] + 4 || array[4] == array[3] + 4 && array[3] == array[2] + 4 && array[2] == array[1] + 4) {

			alert(colores[2]);
			
		}else if (array[1] == array[0] + 5 && array[2] == array[1] + 5 && array[3] == array[2] + 5 || array[4] == array[3] + 5 && array[3] == array[2] + 5 && array[2] == array[1] + 5) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 6 && array[2] == array[1] + 6 && array[3] == array[2] + 6 || array[4] == array[3] + 6 && array[3] == array[2] + 6 && array[2] == array[1] + 6) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 7 && array[2] == array[1] + 7 && array[3] == array[2] + 7 || array[4] == array[3] + 7 && array[3] == array[2] + 7 && array[2] == array[1] + 7) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 8 && array[2] == array[1] + 8 && array[3] == array[2] + 8 || array[4] == array[3] + 8 && array[3] == array[2] + 8 && array[2] == array[1] + 8) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 9 && array[2] == array[1] + 9 && array[3] == array[2] + 9 || array[4] == array[3] + 9 && array[3] == array[2] + 9 && array[2] == array[1] + 9) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 10 && array[2] == array[1] + 10 && array[3] == array[2] + 10 || array[4] == array[3] + 10 && array[3] == array[2] + 10 && array[2] == array[1] + 10) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 11 && array[2] == array[1] + 11 && array[3] == array[2] + 11 || array[4] == array[3] + 11 && array[3] == array[2] + 11 && array[2] == array[1] + 11) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 12 && array[2] == array[1] + 12 && array[3] == array[2] + 12 || array[4] == array[3] + 12 && array[3] == array[2] + 12 && array[2] == array[1] + 12) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 13 && array[2] == array[1] + 13 && array[3] == array[2] + 13 || array[4] == array[3] + 13 && array[3] == array[2] + 13 && array[2] == array[1] + 13) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 2 && array[2] == array[1] + 2 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 3 && array[2] == array[1] + 3 && array[3] == array[2] + 1) {

			alert(colores[2]);

		}else if (array[1] == array[0] + 4 && array[2] == array[1] + 4 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 5 && array[2] == array[1] + 5 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 6 && array[2] == array[1] + 6 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 7 && array[2] == array[1] + 7 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 8 && array[2] == array[1] + 8 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 9 && array[2] == array[1] + 9 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 10 && array[2] == array[1] + 10 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 11 && array[2] == array[1] + 11 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 12 && array[2] == array[1] + 12 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else if (array[1] == array[0] + 13 && array[2] == array[1] + 13 && array[3] == array[2] + 1) {
			
			alert(colores[2]);

		}else{

			alert(colores[0]);

		}

	}

	random(){

		let resultado = [];
		let omitir = [];

		if (this.inc1 == 0 || this.inc2 == 0) {

				omitir.push(this.exc1, this.exc2);

				if (this.inc1 != 0) {

					resultado.push(this.inc1);
					let i = 0;
					let x = 0;
					let y = 0;
					let z = 0;

					i = parseInt(this.getRandomArbitrary(1,55));
					y = parseInt(this.getRandomArbitrary(1,55));
					x = parseInt(this.getRandomArbitrary(1,55));
					z = parseInt(this.getRandomArbitrary(1,55));

					resultado.push(i, x, y, z);
					let indice = resultado.length, temporaryValue, randomIndex;

					while(0 !== indice){

						randomIndex = Math.floor(Math.random() * indice);
						indice -= 1;
						temporaryValue = resultado[indice];
						resultado[indice] = resultado[randomIndex];
						resultado[randomIndex] = temporaryValue;

					}
					 
					const array = resultado.sort((a, b) => a - b);
					this.validar(array);
					const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
					localStorage.setItem('numero', numero);
					return alert(numero);

				}else{

					resultado.push(this.inc2);
					let i = 0;
					let x = 0;
					let y = 0;
					let z = 0;

					i = parseInt(this.getRandomArbitrary(1,55));
					y = parseInt(this.getRandomArbitrary(1,55));
					x = parseInt(this.getRandomArbitrary(1,55));
					z = parseInt(this.getRandomArbitrary(1,55));

					resultado.push(i, x, y, z);
					let indice = resultado.length, temporaryValue, randomIndex;

					while(0 !== indice){

						randomIndex = Math.floor(Math.random() * indice);
						indice -= 1;
						temporaryValue = resultado[indice];
						resultado[indice] = resultado[randomIndex];
						resultado[randomIndex] = temporaryValue;

					}
					 
					const array = resultado.sort((a, b) => a - b);
					this.validar(array);
					const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
					localStorage.setItem('numero', numero);
					return alert(numero);

				}

			}else if (this.inc1 == 0 && this.inc2 == 0) {

				omitir.push(this.exc1, this.exc2);
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

				resultado.push(a,i, x, y, a);

				const array = resultado.sort((a, b) => a - b);
				this.validar(array);
				const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
				localStorage.setItem('numero', numero);
				return alert(numero);

			}else{

				omitir.push(this.exc1, this.exc2);
				resultado.push(this.inc1, this.inc2);
				let i = 0;
				let x = 0;
				let y = 0;

				i = parseInt(this.getRandomArbitrary(1,55));
				y = parseInt(this.getRandomArbitrary(1,55));
				x = parseInt(this.getRandomArbitrary(1,55));
				resultado.push(i, x, y);

				let indice = resultado.length, temporaryValue, randomIndex;

				while(0 !== indice){

					randomIndex = Math.floor(Math.random() * indice);
					indice -= 1;
					temporaryValue = resultado[indice];
					resultado[indice] = resultado[randomIndex];
					resultado[randomIndex] = temporaryValue;

				}
			 
				const array = resultado.sort((a, b) => a - b);
				this.validar(array);
				const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
				localStorage.setItem('numero', numero);
				return alert(numero);

			}
	}

}
