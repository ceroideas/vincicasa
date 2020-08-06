import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-verifica',
  templateUrl: './verifica.page.html',
  styleUrls: ['./verifica.page.scss'],
})
export class VerificaPage implements OnInit {

  numeros: any = [1, 8, 15, 22, 29, 36, 43, 50];
  numeros2: any = [2, 9, 16, 23, 30, 37, 44, 51];
  numeros3: any = [3, 10, 17, 24, 31, 38, 45, 52];
  numeros4: any = [4, 11, 18, 25, 32, 39, 46, 53];
  numeros5: any = [5, 12, 19, 26, 33, 40, 47, 54];
  numeros6: any = [6, 13, 20, 27, 34, 41, 48, 55];
  numeros7: any = [7, 14, 21, 28, 35, 42, 49];
  combinacion: any = [];
  combinazione: any = [];
  ultimos: any[] = JSON.parse(localStorage.getItem('numeros'));
  fechas: any[] = [];
  usuario: string = localStorage.getItem('correo');

  constructor() { }

  ngOnInit() {

  	for (let i = 0; i < this.ultimos.length; ++i) {

        this.fechas.push(moment().subtract(i, 'd').format('DD') + '/' + moment().subtract(i, 'd').format('MM') + '/' + moment().subtract(i, 'd').format('YYYY'));
        
      }

  }

  seleccionar (event, numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();

    if (event.target.checked && this.combinacion.length < 5) {


      this.combinacion.push(seleccion);

    }else{

      event.target.checked = false;
      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {

        this.combinacion.splice(index, 1);

      }

    }

  }

  seleccionar2 (event, numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();

    if (event.target.checked && this.combinacion.length < 5) {


      this.combinacion.push(seleccion);

    }else{

      event.target.checked = false;
      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {

        this.combinacion.splice(index, 1);

      }

    }
    
  }

  verificar(){

    this.combinazione = this.combinacion.sort((a, b) => a - b);
    let resultado = [];

    for (let i = 0; i < this.combinazione.length; i++) {
      
      for (let x = 0; x < this.ultimos[i].length; x++) {

        if (this.combinazione[i] == this.ultimos[i][x]) {
          
          resultado.push(this.combinazione[i]);
          
        }
       
      }

    }

    console.log(resultado);
    //alert(numeros);

  }

}
