import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.page.html',
  styleUrls: ['./archivo.page.scss'],
})
export class ArchivoPage implements OnInit {

  usuario: string = localStorage.getItem("correo");
  numeros: any[] = [5, 20, 32, 40, 55];
  fecha: string = '12 LUGLIO 2020';

  constructor(private comunicacion: ComunicacionService) { }

  ngOnInit() {
  	this.comunicacion.changeData(this.usuario);
  }

}
