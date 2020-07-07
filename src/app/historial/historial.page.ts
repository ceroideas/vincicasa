import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  dias: any = [];
  fechas: any = [];
  numeros: any = [];
  dias2: any = [];
  fechas2: any = [];
  numeros2: any = [];

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {
  	this.comunicacion.tabla().subscribe((data: any) => {

      let info = [data['dias'][0]];
      let info2 = [data['fechas'][0]];
      let info3 = [data['numeros'][0]];

      for (let i = 7; i >= 0; i--) {

        let obj = info[i];

        for (let key in obj) {

          this.dias.push(obj[key]);

        }

      }

      for (let i = 7; i >= 0; i--) {

        let obj = info2[i];

        for (let key in obj) {

          this.fechas.push(obj[key]);

        }

      }

      for (let i = 7; i >= 0; i--) {

        let obj = info3[i];

        for (let key in obj) {

          this.numeros.push(obj[key]);

        }

      }

  		//console.log(data['numeros'][0].dia1);

  	}, Error => {
  		console.log(Error)
  	});

    this.comunicacion.tabla2().subscribe((data: any) => {

      let info = [data['dias'][0]];
      let info2 = [data['fechas'][0]];
      let info3 = [data['numeros'][0]];

      for (let i = 7; i >= 0; i--) {

        let obj = info[i];

        for (let key in obj) {

          this.dias2.push(obj[key]);

        }

      }

      for (let i = 7; i >= 0; i--) {

        let obj = info2[i];

        for (let key in obj) {

          this.fechas2.push(obj[key]);

        }

      }

      for (let i = 7; i >= 0; i--) {

        let obj = info3[i];

        for (let key in obj) {

          this.numeros2.push(obj[key]);

        }

      }

      //console.log(data['numeros'][0].dia1);

    }, Error => {
      console.log(Error)
    });
  }
}