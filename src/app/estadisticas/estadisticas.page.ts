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
  estracciones: number = 50;

  constructor(private service: ComunicacionService) { }

  ngOnInit() {

    this.service.changeData(this.usuario);
    this.calculos(this.estracciones);

    /*if (localStorage.getItem('e200n') && JSON.parse(localStorage.getItem('e200n')).length > 0) {
      
    }*/

  }

  abrir(){
    if (document.getElementById("estracciones").style.display == 'none') {
      document.getElementById("estracciones").style.display = "block";
    }else{
      document.getElementById("estracciones").style.display = 'none';
    }
  }

  cerrar(){
    document.getElementById("estracciones").style.display = "none";
  }

  calculos(valor){

    this.estracciones = valor;

    let numeros = JSON.parse(localStorage.getItem('e200n'));
    let numero = 0;
    this.salidas = [];

    for (let i = 1; i <= 55; i++) {

      for (let a = 0; a < this.estracciones; a++) {

        for (let x = 0; x < numeros[a].length; x++) {

          if (i == numeros[a][x]) {
            numero++;
          }
        }
        
        this.salidas[i-1] = numero;
        
      }

      numero = 0;

    }

    this.grafico();

  }

  grafico() {

    let array = [];

    for (let i = 1; i <= 55; ++i) {

      if (i <= 55) {

        array.push(i.toString());

      }

    }

    let div: any =  document.getElementById("grafico");
    let canvas: any = div.getContext("2d");
    let gradiente = canvas.createLinearGradient(0, 0, 450, 0);
    gradiente.addColorStop(0, 'orange');   
    gradiente.addColorStop(1, 'orange');

    let MeSeData = {
        labels: array,
        datasets: [
            {
                barThickness: 6,
                data: this.salidas,
                backgroundColor: gradiente
            }]
    };

    let labels = [];

    for (var i = 0; i <= 50; i++) {
      if (i%10 == 0) {
        if (i == 50) {
          labels.push('45');
        }else{
          labels.push(i+'.');
        }
      }else{
        labels.push('');
      }
    }

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
                          fontSize: 12,
                          autoSkip: false,
                          tickMarkLength: 20,
                        },
                        stacked: true,
                        gridLines: {
                          display: false,
                          color: 'white'
                        }
                    }],
                    xAxes: [{
                        labels: labels,
                        type: 'category',
                        position: "top",
                        ticks:{
                          autoSkip: true,
                          autoSkipPadding: 10,
                          fontColor: 'white',
                          fontSize: 14
                        },
                        // stacked: true,
                        gridLines: {
                          // display: false,
                          color: 'white'
                        }
                    }]
                }

            }
        });
     
    }

}