import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combinazione',
  templateUrl: './combinazione.page.html',
  styleUrls: ['./combinazione.page.scss'],
})
export class CombinazionePage implements OnInit {

	excluir: any = [JSON.parse(localStorage.getItem('excluir'))];
	incluir: any = [JSON.parse(localStorage.getItem('incluir'))];
	combinacion: any = [1, 2, 3, 4, 5];
	utl: any = [1, 2, 3, 4, 5];
	utl2: any = [5, 2, 3, 4, 5];
	utl3: any = [4, 2, 3, 4, 5];
	arrays: any = [];
	fechas: any = ['06/01/2000', '08/04/1997', '7/12/2025'];

  constructor() { }

  ngOnInit() {
  	this.arrays.push(this.utl, this.utl2, this.utl3);
  }

  getRandomArbitrary(min, max){
		return Math.random() * (max - min) + min;
	}

  random(event){

		let resultado = [];
		let omitir = [];

		if (this.incluir == undefined) {

				omitir.push(this.excluir[0], this.excluir[1]);

				if (this.incluir[0] != 0) {

					resultado.push(this.incluir[0]);
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
					const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
					localStorage.setItem('numero', numero);
					return alert(numero);

				}else{

					resultado.push(this.incluir[1]);
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
					const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
					localStorage.setItem('numero', numero);
					return alert(numero);

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

				resultado.push(a,i, x, y, a);

				const array = resultado.sort((a, b) => a - b);
				const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
				localStorage.setItem('numero', numero);
				return alert(numero);

			}else{

				omitir.push(this.excluir[0], this.excluir[1]);
				resultado.push(this.incluir[0], this.incluir[1]);
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
				const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
				localStorage.setItem('numero', numero);
				return alert(numero);

			}
	}

}
