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

    let div: any =  document.getElementById("grafico");
  	let canvas: any = div.getContext("2d");
  	let array = [];

  	for (let i = 1; i <= 55; ++i) {

  		array.push(i);

  	}

  	let gradiente = canvas.createLinearGradient(0, 0, 450, 0);
	  gradiente.addColorStop(0, '#FF2300');   
	  gradiente.addColorStop(1, '#FFFEC7');

  	let chart = new Chart(canvas, {
  		type: "horizontalBar",
  		data: {




  			datasets: [
  				{
  					border: "white",
  					label: "ULTIME 200 ESTRAZIONI",
  					backgroundColor : gradiente,
  					data: [{x: array, y: array}],
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
