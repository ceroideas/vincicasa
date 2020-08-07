import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  usuario: string = localStorage.getItem('correo');

  constructor() { }

  ngOnInit() {

  	let canvas = document.getElementById("grafico").getContext("2d");
  	let array = [];

  	for (let i = 1; i <= 56; ++i) {

  		array.push(i);

  	}

  	let gradiente = canvas.createLinearGradient(0, 0, 450, 0);
	gradiente.addColorStop(0, '#FF2300');   
	gradiente.addColorStop(1, '#FFFEC7');

  	let chart = new Chart(canvas, {
  		type: "horizontalBar",
  		data: {
  			labels: array,
  			datasets: [
  				{
  					border: "white",
  					label: "ULTIME 200 ESTRAZIONI",
  					backgroundColor : gradiente,
  					data: ["0.", "5.", "10.", "20.", "30.", "40.", "50.", "+50"],
            fontColor: "white"
  				}
  			]

  		},
      options: {
        fontColor: 'white'
      }

  	});

  }

}
