import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mnumeros',
  templateUrl: './mnumeros.page.html',
  styleUrls: ['./mnumeros.page.scss'],
})
export class MnumerosPage implements OnInit {

  estado: boolean = true;
  estado2: boolean = true;
  check: boolean = false;
  check2: boolean = false;
  inc1: number = 0;
  inc2: number = 0;
  exc1: number = 0;
  exc2: number = 0;
  columna1: any = [1, 6, 11, 16, 21, 26, 31, 36];
  columna2: any = [2, 7, 12, 17, 22, 27, 32, 37];
  columna3: any = [3, 8, 13, 18, 23, 28, 33, 38];
  columna4: any = [4, 9, 14, 19, 24, 29, 34, 39];
  columna5: any = [5, 10, 15, 20, 25, 30, 35, 40];


  constructor() { }

  ngOnInit() {
  }

  cambio(event){
  	if (this.check == false) {
  		this.estado = false;
  	}else{
  		this.estado = true;
  	}
  }

  cambio2(event){
  	if (this.check2 == false) {
  		this.estado2 = false;
  	}else{
  		this.estado2 = true;
  	}
  }

  configuraciones(f: NgForm){

    if (this.inc1 == 0 && this.inc2 == 0 && this.exc1 == 0 && this.exc2 == 0) {

      return alert('Seleccione una configuración');

    }else if(this.inc1 == this.exc1 || this.inc1 == this.exc2 || this.inc2 == this.exc1 || this.inc2 == this.exc2){
     
      return alert('No se puede descartar un número incluído');

    }else{

      if (this.inc1 >= 41 || this.inc2 >= 41 || this.exc1 >= 41 || this.exc2 >= 41) {
        
        return alert('Número inválido (Mayor de 40)');

      }else{

        localStorage.setItem('incluir', this.inc1.toString());
        localStorage.setItem('incluir2', this.inc2.toString());
        localStorage.setItem('excluir', this.exc1.toString());
        localStorage.setItem('excluir2', this.exc2.toString());
        return alert('Configuración aplicada correctamente');

      }

    }
    
  }
  /*getRandomArbitrary(min, max){
    return Math.random() * (max - min) + min;
  }

  random(f: NgForm){

  	let omitir = [];
  	let resultado = [];

  	if (this.inc1 >= 41 || this.inc2 >= 41 || this.exc1 >= 41 || this.exc2 >= 41) {
  		return alert('Número inválido (Mayor de 40)');
  	}else{

      if (this.inc1 == 0 || this.inc2 == 0) {

        omitir.push(this.exc1, this.exc2);

        if (this.inc1 != 0) {

          resultado.push(this.inc1);
          let i = 0;
          let x = 0;
          let y = 0;
          let z = 0;

          i = parseInt(this.getRandomArbitrary(1,41));
          y = parseInt(this.getRandomArbitrary(1,41));
          x = parseInt(this.getRandomArbitrary(1,41));
          z = parseInt(this.getRandomArbitrary(1,41));

          resultado.push(i, x, y, z);
          let indice = resultado.length, temporaryValue, randomIndex;

          while(0 !== indice){

            randomIndex = Math.floor(Math.random() * indice);
            indice -= 1;
            temporaryValue = resultado[indice];
            resultado[indice] = resultado[randomIndex];
            resultado[randomIndex] = temporaryValue;

          }
       
          return alert(resultado);

        }else{

          resultado.push(this.inc2);
          let i = 0;
          let x = 0;
          let y = 0;
          let z = 0;

          i = parseInt(this.getRandomArbitrary(1,41));
          y = parseInt(this.getRandomArbitrary(1,41));
          x = parseInt(this.getRandomArbitrary(1,41));
          z = parseInt(this.getRandomArbitrary(1,41));

          resultado.push(i, x, y, z);
          let indice = resultado.length, temporaryValue, randomIndex;

          while(0 !== indice){

            randomIndex = Math.floor(Math.random() * indice);
            indice -= 1;
            temporaryValue = resultado[indice];
            resultado[indice] = resultado[randomIndex];
            resultado[randomIndex] = temporaryValue;

          }
       
          return alert(resultado);

        }

      }else if (this.inc1 == 0 && this.inc2 == 0) {

        omitir.push(this.exc1, this.exc2);
        let a = 0;
        let i = 0;
        let x = 0;
        let y = 0;
        let z = 0;

        a = parseInt(this.getRandomArbitrary(1,41));
        i = parseInt(this.getRandomArbitrary(1,41));
        y = parseInt(this.getRandomArbitrary(1,41));
        x = parseInt(this.getRandomArbitrary(1,41));
        z = parseInt(this.getRandomArbitrary(1,41));

        resultado.push(a,i, x, y, a);

        return alert(resultado);

      }else{

        omitir.push(this.exc1, this.exc2);
        resultado.push(this.inc1, this.inc2);
        let i = 0;
        let x = 0;
        let y = 0;

        i = parseInt(this.getRandomArbitrary(1,41));
        y = parseInt(this.getRandomArbitrary(1,41));
        x = parseInt(this.getRandomArbitrary(1,41));
        resultado.push(i, x, y);

        let indice = resultado.length, temporaryValue, randomIndex;

        while(0 !== indice){

          randomIndex = Math.floor(Math.random() * indice);
          indice -= 1;
          temporaryValue = resultado[indice];
          resultado[indice] = resultado[randomIndex];
          resultado[randomIndex] = temporaryValue;

        }
       
        return alert(resultado);

      }
  		
  	}

  }*/

}
