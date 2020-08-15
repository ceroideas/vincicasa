import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-frequenti',
  templateUrl: './frequenti.page.html',
  styleUrls: ['./frequenti.page.scss'],
})
export class FrequentiPage implements OnInit {

  usuario: string = localStorage.getItem('correo');
  numeros: any[] = [1, 2, 3, 4, 5, 6, 7, 22];

  constructor(private service: ComunicacionService) { }

  ngOnInit() {
  	this.service.changeData(this.usuario);
  }

}
