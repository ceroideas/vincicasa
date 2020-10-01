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
    document.getElementById("estracciones").style.display = "block";
  }

  cerrar(){
    document.getElementById("estracciones").style.display = "none";
  }

  calculos(valor){

    if (valor == 50) {

      this.estracciones = 50;

    }else{

      this.estracciones = 100;

    }

    let numeros = JSON.parse(localStorage.getItem('e200n'));
    let numero = 0;
    this.salidas = [];

    for (let i = 1; i <= 55; i++) {

      for (let a = 1; a <= this.estracciones; a++) {

        for (let x = 0; x < numeros[a].length; x++) {

          if (i == numeros[a][x]) {

            numero++;
            this.salidas[i-1] = numero;

          }

        }
        
      }

      numero = 0;

    }

    this.grafico(/*selected*/);

  }

  grafico(/*ultimas*/) {

    let array = [];

    for (let i = 1; i <= 55; ++i) {

      if (i <= 55) {
        array.push(i.toString());
      }

    }

    let div: any =  document.getElementById("grafico");
    let canvas: any = div.getContext("2d");
    let gradiente = canvas.createLinearGradient(0, 0, 450, 0);
    gradiente.addColorStop(0, 'gold');   
    gradiente.addColorStop(1, 'gold');

    let MeSeData = {
        labels: array,
        datasets: [
            {
                data: this.salidas,
                backgroundColor: gradiente
            }]
    };

    //console.log(MeSeData);
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
                        autoSkip: false,
                        ticks:{
                          fontColor: 'white',
                          fontSize: 12,
                          autoSkip: false,
                          tickMarkLength: 20,
                        },
                        stacked: true,
                        gridLines: {
                          color: 'white'
                        }
                    }],
                    xAxes: [{
                        position: "top",
                        ticks:{
                          fontColor: 'white',
                          fontSize: 14
                        },
                        // stacked: true,
                        gridLines: {
                          color: 'white'
                        }
                    }]
                }

            }
        });
     
    }

}