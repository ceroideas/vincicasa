import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-retardati',
  templateUrl: './retardati.page.html',
  styleUrls: ['./retardati.page.scss'],
})
export class RetardatiPage implements OnInit {

  usuario: string = localStorage.getItem('correo');
  data1: any[] = JSON.parse(localStorage.getItem('infrecuentes'));
  data2: any[] = JSON.parse(localStorage.getItem('infrecuencia'));
  numeros: any[] = [this.data1[0], this.data1[1], this.data1[2], this.data1[3], this.data1[4]];
  frecuencia: any[] = [this.data2[0], this.data2[1], this.data2[2], this.data2[3], this.data2[4]];
  numeros2: any[] = [this.data1[5], this.data1[6], this.data1[7], this.data1[8], this.data1[9]];
  frecuencia2: any[] = [this.data2[5], this.data2[6], this.data2[7], this.data2[8], this.data2[9]];

  constructor(private service: ComunicacionService) { }

  ngOnInit() {
  	this.service.changeData(this.usuario);
  }

}