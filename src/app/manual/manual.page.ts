import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  usuario: string = localStorage.getItem('usuario');

  constructor(private service: ComunicacionService) { }

  ngOnInit() {
  	this.service.changeData(this.usuario);
  }

}

