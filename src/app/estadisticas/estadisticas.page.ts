import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss']
})
export class EstadisticasPage implements OnInit {

  usuario: string = localStorage.getItem('usuario');
  salidas: any[] = [];
  estracciones: number = 30;

  constructor(private service: ComunicacionService) { }

  ngOnInit() {

    this.service.changeData(this.usuario);
    this.calculos();

    /*if (localStorage.getItem('e200n') && JSON.parse(localStorage.getItem('e200n')).length > 0) {
      
    }*/

  }

  calculos(selected = this.estracciones){

    let numeros = JSON.parse(localStorage.getItem('e200n'));
    let numero = 0;

    for (let i = 1; i < 56; i++) {

      for (let a = 0; a < this.estracciones; a++) {

        for (let x = 0; x < numeros[a].length; x++) {

          if (i == numeros[a][x]) {

            numero++;
            this.salidas[i] = numero;

          }

        }
        
      }

      numero = 0;

    }

    this.grafico(selected);

  }

  grafico(ultimas) {

    let array = [];
      let array2 = [];

      for (let i = 1; i <= 55; ++i) {

        if (i < 51) {
          array.push(i.toString());
        }
        
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

                    display: false,
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
     
    }

}