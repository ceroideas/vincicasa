import { Component, OnInit/*, ChangeDetectorRef, ChangeDetectionStrategy*/ } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss']/*,
  changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class EstadisticasPage implements OnInit {

  usuario: string = localStorage.getItem('correo');
  salidas: any[] = [];

  constructor(private service: ComunicacionService/*, private cambio: ChangeDetectorRef*/) { }

  ngOnInit() {

    this.service.changeData(this.usuario);
    this.calculos();

  }

  calculos(){

    let numeros = JSON.parse(localStorage.getItem('e200n'));
    let numero = 0;

    for (let i = 1; i < 56; i++) {

      for (let a = 0; a < numeros.length; a++) {

        for (let x = 0; x < numeros[a].length; x++) {

          if (i == numeros[a][x]) {

            numero++;
            this.salidas[i] = numero;

          }

        }
        
      }

      numero = 0;

    }

    this.grafico();

  }

  grafico() {

    let array = [];
      let array2 = [];

      for (let i = 0; i <= 55; ++i) {

        array.push(i.toString());
        array2.push(i);

      }

    let div: any =  document.getElementById("grafico");
    let canvas: any = div.getContext("2d");
    let gradiente = canvas.createLinearGradient(0, 0, 450, 0);
    gradiente.addColorStop(0, '#FF2300');   
    gradiente.addColorStop(1, '#FFFEC7');

    let MeSeData = {
        labels: array,
        datasets: [
            {
                label: "ULTIME 200 ESTRAZIONI",
                data: this.salidas,
                backgroundColor: gradiente
            }]
    };

    let MeSeChart = new Chart(canvas, {
      type: 'horizontalBar',
      data: MeSeData,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
              labels: {
                  fontColor: "white",
                  fontSize: 18
              }
          },
          scales: {
              yAxes: [{
                  ticks:{
                    fontColor: 'white',
                    fontSize: 14
                  },
                  stacked: true,
                  gridLines: {
                    color: 'white'
                  }
              }],
              xAxes: [{
                  ticks:{
                    fontColor: 'white',
                    fontSize: 14
                  },
                  stacked: true,
                  gridLines: {
                    color: 'white'
                  }
              }]
          }

      }
  });
     /* let array = [];
      let array2 = [];

      for (let i = 0; i <= 55; ++i) {

        array.push(i.toString());
        array2.push(i+5);

      }

      let gradiente = canvas.createLinearGradient(0, 0, 450, 0);
      gradiente.addColorStop(0, '#FF2300');   
      gradiente.addColorStop(1, '#FFFEC7');

      let chart = new Chart(canvas, {
        type: "horizontalBar",
        data: {

          labels: [
            array
          ],
          datasets: [
            {
              barThickness: 6,
              //border: "white",
              label: "ULTIME 200 ESTRAZIONI",
              backgroundColor : gradiente,
              data: [array2, array2],
              fontColor: "white"
            }
          ]

        },
        options: {
         responsive: true,
         maintainAspectRatio: false
         /*scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero:true
                 }
             }]
         }
        }

      });*/

      //this.cambios();

    }

    /*cambios(){
      this.cambio.detectChanges();
    }*/

}