import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-verifica',
  templateUrl: './verifica.page.html',
  styleUrls: ['./verifica.page.scss'],
})
export class VerificaPage implements OnInit {

  numeros: any = [1, 6, 11, 16, 21, 26, 31, 36];
  numeros2: any = [2, 7, 12, 17, 22, 27, 32, 37];
  numeros3: any = [3, 8, 13, 18, 23, 28, 33, 38];
  numeros4: any = [4, 9, 14, 19, 24, 29, 34, 39];
  numeros5: any = [5, 10, 15, 20, 25, 30, 35, 40];
  combinacion: any = [];
  ultimos: any[] = JSON.parse(localStorage.getItem('numeros'));
  fechas: any[] = [];
  usuario: string = localStorage.getItem('usuario');
  dias: any[] = [];
  numerosx: any[] = [];

  constructor(private cd: ChangeDetectorRef, private comunicacion: ComunicacionService) { }

  ngOnInit() {

    this.comunicacion.changeData(this.usuario);
    this.dias = JSON.parse(localStorage.getItem('dias'));
    this.fechas = JSON.parse(localStorage.getItem('e200f'));
    this.numerosx = JSON.parse(localStorage.getItem('numeros'));

  	for (let i = 0; i < this.ultimos.length; i++) {

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

    /*let resultado = [];

    for (let i = 0; i < this.ultimos[0].length; i++) {

      for (let a = 0; a < this.ultimos[0].length; a++) {

        if (parseInt(this.ultimos[0][i]) == this.combinacion[a]) {
            
          resultado.push(this.combinacion[a]);

        }
        
      }
       
    }*/

    this.numerosx = [];
    this.cd.detectChanges();
    this.numerosx = JSON.parse(localStorage.getItem('numeros'));

   // console.log(resultado);

  }

}
