import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-retardati',
  templateUrl: './retardati.page.html',
  styleUrls: ['./retardati.page.scss'],
})
export class RetardatiPage implements OnInit {

  usuario: string = localStorage.getItem('usuario');
  data1: any[] = [];
  data2: any[] = [];
  numeros: any[] = [];
  frecuencia: any[] = [];
  numeros2: any[] = [];
  frecuencia2: any[] = [];

  constructor(private service: ComunicacionService) { }

  ngOnInit() {

  	this.service.changeData(this.usuario);

    if (localStorage.getItem('infrecuentes') && JSON.parse(localStorage.getItem('infrecuentes')).length > 0) {

      this.data1 = JSON.parse(localStorage.getItem('infrecuentes'));
      this.data2 = JSON.parse(localStorage.getItem('infrecuencia'));
      this.numeros = [this.data1[0], this.data1[1], this.data1[2], this.data1[3], this.data1[4]];
      this.frecuencia = [this.data2[0], this.data2[1], this.data2[2], this.data2[3], this.data2[4]];
      this.numeros2 = [this.data1[5], this.data1[6], this.data1[7], this.data1[8], this.data1[9]];
      this.frecuencia2 = [this.data2[5], this.data2[6], this.data2[7], this.data2[8], this.data2[9]];
      
    }

  }

  ordenar(){
    
    this.numeros = this.numeros.sort((a,b)=> a - b);
    this.numeros2 = this.numeros2.sort((a,b)=> a - b);

  }

}