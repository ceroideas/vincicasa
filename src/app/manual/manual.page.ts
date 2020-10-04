import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  slideOpts = {
	scrollbar: true,
  }

  @ViewChild('dSlides') slides: IonSlides;

  usuario: string = localStorage.getItem('usuario');

  constructor(private service: ComunicacionService) { }

  ngOnInit() {
  	this.service.changeData(this.usuario);
  }

}

