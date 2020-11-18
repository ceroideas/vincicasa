import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preseleccion',
  templateUrl: './preseleccion.page.html',
  styleUrls: ['./preseleccion.page.scss'],
})
export class PreseleccionPage implements OnInit {
  
  checks = [
  	"<span class='title'> ESEGUI UN DOPPIO PROCESSO DI CALCOLO </span> La combinazione viene riformulata dopo il primo processo.",
  	"<span class='title'> ESEGUI UN METODO DI RIDUZIONE </span> considera un numero ridotto delle variabili.",
  	"<span class='title'> ESTRAPOLA UN SISTEMA </span> Fornisce la combinazione basandosi su un sistema di numeri casuali.",
  	"<span class='title'> SALTA LA FUNZIONE </span> Il processo considera un numero di calcolo più semplice.",
  	"<span class='title'> VINCOLA LE VARIABILI </span> nel calcolo sono vincolati delle variabili in modo random."
  ];

  checked:any = [];

  incluidos:any = [];
  excluidos:any = [];

  constructor() { }

  ngOnInit() {

	this.incluidos = localStorage.getItem('incluidos') ? JSON.parse(localStorage.getItem('incluidos')) : [];
	this.excluidos = localStorage.getItem('excluidos') ? JSON.parse(localStorage.getItem('excluidos')) : [];

  	if (localStorage.getItem('checks')) {
      this.checked = JSON.parse(localStorage.getItem('checks'));
    }
  }

}
