import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.page.html',
  styleUrls: ['./archivo.page.scss'],
})
export class ArchivoPage implements OnInit {

  usuario: string = localStorage.getItem("correo");
  fechas: string = JSON.parse(localStorage.getItem("e200f"));
  combinaciones: any = JSON.parse(localStorage.getItem("e200n"));
  numeros: any[] = [];
  fecha: any;

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {
  	this.comunicacion.changeData(this.usuario);
  }

  verifica(){
    
    this.numeros = [];
    let formato = moment(this.fecha).format('YYYY-MM-DD').split("-");
    let fecha = formato[0] + formato[1] + formato[2];
    this.fecha = fecha;

    for (let i = 0; i < this.fechas.length; i++) {

      if (parseInt(this.fechas[i]) == parseInt(fecha)) {

        console.log(this.combinaciones[i][0], this.combinaciones[i][1], this.combinaciones[i][2], this.combinaciones[i][3], this.combinaciones[i][4]);

        for (let x = 0; x < this.combinaciones[i].length; x++) {

          this.numeros.push(this.combinaciones[i][x].toString());

        }

        break;

      }

    }

  }

}
