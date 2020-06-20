import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComunicacionService } from '../comunicacion.service';
import { Numeros } from '../numeros';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  data = new Numeros();
  n1: string = localStorage.getItem('excluir');
  exc1: number = +this.n1;
  n2: string = localStorage.getItem('excluir2');
  exc2: number = +this.n2;
  n3: string = localStorage.getItem('incluir');
  inc1: number = +this.n3;
  n4: string = localStorage.getItem('incluir2');
  inc2: number = +this.n4;
  resultado: any = [];
  colores: string;

  constructor(private comunicacion: ComunicacionService, private router: Router) { }

  ngOnInit() {
    this.random();
  }

  getRandomArbitrary(min, max){
    return Math.random() * (max - min) + min;
  }

  validar(event, array = this.resultado){

    const semaforo = document.getElementById("rvalidacion");
    const colores = ['Combinación probable: Verde', 'Combinación poco probable: Amarillo', 'Combinación difícilmente probable: Rojo'];

    if (semaforo.style.display = 'none') {
      semaforo.style.display = 'block';
    }

    if (array[1] == array[0] + 1 && array[2] == array[1] + 1 || array[2] == array[1] + 1 && array[3] == array[2] + 1 || array[3] == array[2] + 1 && array[4] == array[3] + 1) {
      
      this.colores = colores[1];

    }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[3] == array[2] + 1  || array[2] == array[1] + 1 && array[3] == array[2] + 1 && array[4] == array[3] + 1) {
      
      this.colores = colores[1];

    }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[4] == array[3] + 1 || array[4] == array[3] + 1 && array[3] == array[2] + 1 && array[1] == array[0] + 1) {

      this.colores = colores[2];

    }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[3] == array[2] + 1 || array[4] == array[3] + 1 && array[3] == array[2] + 1 && array[2] == array[1] + 1) {
            
      this.colores = colores[2];

    }else if (array[1] == array[0] + 2 && array[2] == array[1] + 2 && array[3] == array[2] + 2 || array[4] == array[3] + 2 && array[3] == array[2] + 2 && array[2] == array[1] + 2) {
            
      this.colores = colores[2];

    }else if (array[1] == array[0] + 3 && array[2] == array[1] + 3 || array[4] == array[3] + 3 && array[3] == array[2] + 3) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 4 && array[2] == array[1] + 4 && array[3] == array[2] + 4 || array[4] == array[3] + 4 && array[3] == array[2] + 4 && array[2] == array[1] + 4) {

      this.colores = colores[2];
      
    }else if (array[1] == array[0] + 5 && array[2] == array[1] + 5 && array[3] == array[2] + 5 || array[4] == array[3] + 5 && array[3] == array[2] + 5 && array[2] == array[1] + 5) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 6 && array[2] == array[1] + 6 && array[3] == array[2] + 6 || array[4] == array[3] + 6 && array[3] == array[2] + 6 && array[2] == array[1] + 6) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 7 && array[2] == array[1] + 7 && array[3] == array[2] + 7 || array[4] == array[3] + 7 && array[3] == array[2] + 7 && array[2] == array[1] + 7) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 8 && array[2] == array[1] + 8 && array[3] == array[2] + 8 || array[4] == array[3] + 8 && array[3] == array[2] + 8 && array[2] == array[1] + 8) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 9 && array[2] == array[1] + 9 && array[3] == array[2] + 9 || array[4] == array[3] + 9 && array[3] == array[2] + 9 && array[2] == array[1] + 9) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 10 && array[2] == array[1] + 10 && array[3] == array[2] + 10 || array[4] == array[3] + 10 && array[3] == array[2] + 10 && array[2] == array[1] + 10) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 11 && array[2] == array[1] + 11 && array[3] == array[2] + 11 || array[4] == array[3] + 11 && array[3] == array[2] + 11 && array[2] == array[1] + 11) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 12 && array[2] == array[1] + 12 && array[3] == array[2] + 12 || array[4] == array[3] + 12 && array[3] == array[2] + 12 && array[2] == array[1] + 12) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 13 && array[2] == array[1] + 13 && array[3] == array[2] + 13 || array[4] == array[3] + 13 && array[3] == array[2] + 13 && array[2] == array[1] + 13) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 2 && array[2] == array[1] + 2 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 3 && array[2] == array[1] + 3 && array[3] == array[2] + 1) {

      this.colores = colores[2];

    }else if (array[1] == array[0] + 4 && array[2] == array[1] + 4 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 5 && array[2] == array[1] + 5 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 6 && array[2] == array[1] + 6 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 7 && array[2] == array[1] + 7 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 8 && array[2] == array[1] + 8 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 9 && array[2] == array[1] + 9 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 10 && array[2] == array[1] + 10 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 11 && array[2] == array[1] + 11 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 12 && array[2] == array[1] + 12 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 13 && array[2] == array[1] + 13 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else{

      this.colores = colores[0];

    }

  }

  random(){

    let resultado = [];
    let omitir = [];

    if (this.inc1 == undefined || this.inc2 == undefined) {

        omitir.push(this.exc1, this.exc2);

        if (this.inc1 != undefined) {

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
           
          const array = resultado.sort((a, b) => a - b);
          const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
          localStorage.setItem('numero', numero);

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
           
          const array = resultado.sort((a, b) => a - b);
          const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
          localStorage.setItem('numero', numero);

        }

      }else if (this.inc1 == undefined && this.inc2 == undefined) {

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

        const array = resultado.sort((a, b) => a - b);
        const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
        localStorage.setItem('numero', numero);

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
       
        const array = resultado.sort((a, b) => a - b);
        const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
        localStorage.setItem('numero', numero);
        this.resultado.push(array[0], array[1], array[2], array[3], array[4]);

      }
  }

  toggle(event){

  	const menu = document.getElementById("menu");
    const app = document.getElementById("game");

  	if (menu.style.display == 'none') {

      app.style.display = 'none';
  		menu.style.display = 'block';

  	}else{

  		menu.style.display = 'none';
      app.style.display = 'block';

  	}
  }

  numeros(event){

    this.data.numero = localStorage.getItem('numero');
    this.data.correo = localStorage.getItem('correo');
    const jsono = { 
      numero: this.data.numero,
      correo: this.data.correo
    };
    
    this.comunicacion.number(jsono).subscribe((data) => {

      if (data.respuesta == 'nousuario') {
        
        alert('Usuario no está en sesión');
        this.router.navigateByUrl('/home');

      }else{

        alert('Número enviado exitosamente');
      
      }
      
    }, Error => {
      console.log(Error);
    });
  }

  salir(event){
    this.router.navigateByUrl('/home');
  }

}
