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
  numeros: any;
  fecha: any;

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {
  	this.comunicacion.changeData(this.usuario);
  }

  verifica(){
    
    let formato = moment(this.fecha).format('YYYY-MM-DD').split("-");
    let fecha = formato[0] + formato[1] + formato[2];
    this.fecha = fecha;

    for (let i = 0; i < this.fechas.length; i++) {

      console.log(this.fechas[i], parseInt(fecha));

      if (this.fechas[i] == parseInt(fecha)) {

        this.numeros = this.combinaciones[i];
        break;

      }

    }

  }

}
