import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ComunicacionService } from '../comunicacion.service';
import * as moment from 'moment';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.page.html',
  styleUrls: ['./archivo.page.scss'],
})
export class ArchivoPage implements OnInit {

  @ViewChild('content') private content: any;

  usuario: string = localStorage.getItem("usuario");
  fechas: any = [];
  combinaciones: any = [];
  numeros: any[] = [];
  fecha: any;
  type: "string";

  constructor(private comunicacion: ComunicacionService, public alert: AlertController) { }

  ngOnInit() {

  	this.comunicacion.changeData(this.usuario);

    if (localStorage.getItem('e200f') && JSON.parse(localStorage.getItem('e200f')).length > 0) {

      this.fechas = JSON.parse(localStorage.getItem("e200f"));
      this.combinaciones = JSON.parse(localStorage.getItem("e200n"));

    }

  }

  /*d: any = new Date();
  f: any = new Date();
  this.d.setDate(d.getDate()-5);*/
  desde: any = moment().subtract(199, 'd');
  hasta: any = moment();
  
  optionsRange: CalendarComponentOptions = {
    monthFormat: 'DD MMM YYYY',
    weekdays: ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
    weekStart: 1,
    pickMode: 'single',
    from: this.desde,
    to: this.hasta
  };

  /*onChange($event) {
    console.log($event);
  }*/
  mostrar(){

    let calendario = document.getElementById("calendario");
    calendario.style.display = 'block';

  }

  verifica($event){

    //console.log(this.fecha);

    let h = (document.getElementById('body') as HTMLElement).offsetHeight;

    this.content.scrollToBottom(h);
    
    if (this.combinaciones && this.combinaciones.length > 0) {

      this.numeros = [];
      let formato = moment(this.fecha).format('YYYYMMDD')/*.split("-")*/;
      // let fecha = formato[0] + formato[1] + formato[2];
      // this.fecha = formato;

      let i = this.fechas.findIndex( x=>x==parseInt(formato) );

      if (i != -1) {
        for (let x = 0; x < this.combinaciones[i].length; x++) {

          this.numeros.push(this.combinaciones[i][x].toString());

        }
      }else{
        this.alert.create({message:"Nessun risultato per il giorno selezionato"}).then(a=>a.present());
      }


      // for (let i = 0; i < this.fechas.length; i++) {

      //   if (parseInt(this.fechas[i]) == parseInt(formato)) {

      //     console.log(this.combinaciones[i][0], this.combinaciones[i][1], this.combinaciones[i][2], this.combinaciones[i][3], this.combinaciones[i][4]);


      //     break;

      //   }

      // }
      
    }

  }

}
