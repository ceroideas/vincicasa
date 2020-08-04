import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-mnumeros',
  templateUrl: './mnumeros.page.html',
  styleUrls: ['./mnumeros.page.scss'],
})
export class MnumerosPage implements OnInit {

  /*estado: boolean = true;
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
  */
  numeros: any = [1, 8, 15, 22, 29, 36, 43, 50];
  numeros2: any = [2, 9, 16, 23, 30, 36, 44, 51];
  numeros3: any = [3, 10, 17, 24, 31, 37, 45, 52];
  numeros4: any = [4, 11, 18, 25, 32, 38, 46, 53];
  numeros5: any = [5, 12, 19, 26, 33, 39, 47, 54];
  numeros6: any = [6, 13, 20, 27, 34, 40, 48, 55];
  numeros7: any = [7, 14, 21, 28, 35, 41, 49];
  combinacion: any = [];
  final: any = [];
  colores: string;
  usuario: string = localStorage.getItem('correo');

  constructor(private service: ComunicacionService) { }

  ngOnInit() {

    this.service.changeData(this.usuario);

  }

  /*cambio(event){
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

  seleccionar (event, numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();
    //let elemento = document.getElementById(valor);

    if (event.target.checked && this.combinacion.length < 5) {


      this.combinacion.push(seleccion);

    }else{

      event.target.checked = false;
      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {

        this.combinacion.splice(index, 1);

      }

    }

    console.log(this.combinacion);

    /*if (elemento.style.backgroundImage == 'none') {

      if (this.combinacion.length < 5) {

        elemento.style.backgroundImage = 'url(' +  '/assets/fondo-numero-rojo-verde.png' + ')';
        elemento.style.backgroundPosition = 'center';
        elemento.style.backgroundRepeat = 'no-repeat';
        elemento.style.height = '100%';

        if (window.matchMedia("(min-height: 650px)").matches) {

          elemento.style.backgroundSize = '27.5px' + ' ' + '32.5px';

        }else if (window.matchMedia("(min-height: 560px)").matches) {

          elemento.style.backgroundSize = '32.5px' + ' ' + '32.5px';
          
        }if (window.matchMedia("(min-height: 1024px)").matches) {
          
          elemento.style.backgroundSize = '45px' + ' ' + '45px';

        }if (window.matchMedia("(min-height: 1300px)").matches) {
          
          elemento.style.backgroundSize = '55px' + ' ' + '55px';

        } else {

          elemento.style.backgroundSize = '32.5px' + ' ' + '37.5px';

        }

        this.combinacion.push(seleccion);

      }

    }else{

      elemento.style.backgroundImage = 'none';

      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {
        this.combinacion.splice(index, 1);
      }

    }*/
    
  }

  seleccionar2 (event, numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();
    //let elemento = document.getElementById(valor);

    if (event.target.checked && this.combinacion.length < 5) {


      this.combinacion.push(seleccion);

    }else{

      event.target.checked = false;
      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {

        this.combinacion.splice(index, 1);

      }

    }

    console.log(this.combinacion);

  }

  validar(){

    console.log(this.combinacion);
    const combinazione = this.combinacion.sort((a, b) => a - b);
    // let array = [];
    // array.push(combinazione[0], combinazione[1], combinazione[2], combinazione[3], combinazione[4]);
    const semaforo = document.getElementById("rvalidacion");
    const colores = ['green', 'yellow', 'red'];
    const primos = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
    let nprimos = 0;

    for (let i = 0; i <= combinazione.length; i++) {

      let numero = combinazione[i];

      for (let x = 0; x < primos.length; x++) {

        let primo = primos[x];

        if (numero == primo) {
          nprimos++;
        }
      }
    }

    console.log(nprimos);

    if (nprimos >= 4) {
      return this.colores = colores[2];
    }

    // regla 1
    let a = 0;
    //
    for (let i = 0; i < combinazione.length; i++) {
      if (combinazione[i+1] !== undefined) {
        if (combinazione[i]+1 == combinazione[i+1]) {
          a++;
        }
      }
    }
    //
    if (a >= 3) {
      return this.colores = colores[2];
    }
    // regla 2
    //
    for (let h = 2; h <= 13; h++) {
      //
      a = 0;
      //
      for (let i = 0; i < combinazione.length; i++) {
        if (combinazione[i+1] !== undefined) {
          if (combinazione[i]+h == combinazione[i+1]) {
            a++;
          }
        }
      }
      
      if (a >= 3) {
        return this.colores = colores[2];
      }
      //
    }

    this.colores = colores[0];

    /*if (semaforo.style.display = 'none') {
      semaforo.style.display = 'block';
    }*/



    // if (array[1] == array[0] + 1 && array[2] == array[1] + 1 || array[2] == array[1] + 1 && array[3] == array[2] + 1 || array[3] == array[2] + 1 && array[4] == array[3] + 1) {
      
    //   this.colores = colores[1];

    // }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[3] == array[2] + 1  || array[2] == array[1] + 1 && array[3] == array[2] + 1 && array[4] == array[3] + 1) {
      
    //   this.colores = colores[1];

    // }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[4] == array[3] + 1 || array[4] == array[3] + 1 && array[3] == array[2] + 1 && array[1] == array[0] + 1) {

    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[3] == array[2] + 1 || array[4] == array[3] + 1 && array[3] == array[2] + 1 && array[2] == array[1] + 1) {
            
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 2 && array[2] == array[1] + 2 && array[3] == array[2] + 2 || array[4] == array[3] + 2 && array[3] == array[2] + 2 && array[2] == array[1] + 2) {
            
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 3 && array[2] == array[1] + 3 || array[4] == array[3] + 3 && array[3] == array[2] + 3) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 4 && array[2] == array[1] + 4 && array[3] == array[2] + 4 || array[4] == array[3] + 4 && array[3] == array[2] + 4 && array[2] == array[1] + 4) {

    //   this.colores = colores[2];
      
    // }else if (array[1] == array[0] + 5 && array[2] == array[1] + 5 && array[3] == array[2] + 5 || array[4] == array[3] + 5 && array[3] == array[2] + 5 && array[2] == array[1] + 5) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 6 && array[2] == array[1] + 6 && array[3] == array[2] + 6 || array[4] == array[3] + 6 && array[3] == array[2] + 6 && array[2] == array[1] + 6) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 7 && array[2] == array[1] + 7 && array[3] == array[2] + 7 || array[4] == array[3] + 7 && array[3] == array[2] + 7 && array[2] == array[1] + 7) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 8 && array[2] == array[1] + 8 && array[3] == array[2] + 8 || array[4] == array[3] + 8 && array[3] == array[2] + 8 && array[2] == array[1] + 8) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 9 && array[2] == array[1] + 9 && array[3] == array[2] + 9 || array[4] == array[3] + 9 && array[3] == array[2] + 9 && array[2] == array[1] + 9) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 10 && array[2] == array[1] + 10 && array[3] == array[2] + 10 || array[4] == array[3] + 10 && array[3] == array[2] + 10 && array[2] == array[1] + 10) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 11 && array[2] == array[1] + 11 && array[3] == array[2] + 11 || array[4] == array[3] + 11 && array[3] == array[2] + 11 && array[2] == array[1] + 11) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 12 && array[2] == array[1] + 12 && array[3] == array[2] + 12 || array[4] == array[3] + 12 && array[3] == array[2] + 12 && array[2] == array[1] + 12) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 13 && array[2] == array[1] + 13 && array[3] == array[2] + 13 || array[4] == array[3] + 13 && array[3] == array[2] + 13 && array[2] == array[1] + 13) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 2 && array[2] == array[1] + 2 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 3 && array[2] == array[1] + 3 && array[3] == array[2] + 1) {

    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 4 && array[2] == array[1] + 4 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 5 && array[2] == array[1] + 5 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 6 && array[2] == array[1] + 6 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 7 && array[2] == array[1] + 7 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 8 && array[2] == array[1] + 8 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 9 && array[2] == array[1] + 9 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 10 && array[2] == array[1] + 10 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 11 && array[2] == array[1] + 11 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 12 && array[2] == array[1] + 12 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if (array[1] == array[0] + 13 && array[2] == array[1] + 13 && array[3] == array[2] + 1) {
      
    //   this.colores = colores[2];

    // }else if(nprimos >= 4){

    //   this.colores = colores[1];

    // }else{

    //   this.colores = colores[0];

    // }

  }

}
