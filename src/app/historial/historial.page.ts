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

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {

    this.dias = JSON.parse(localStorage.getItem('dias'));
    this.fechas = JSON.parse(localStorage.getItem('fechas'));
    this.numeros = JSON.parse(localStorage.getItem('numeros'));

  }
}