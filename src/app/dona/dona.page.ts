import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.page.html',
  styleUrls: ['./dona.page.scss'],
})
export class DonaPage implements OnInit {

  usuario: string = localStorage.getItem('usuario');

  constructor(private comunicacion: ComunicacionService) { }

  type = "text";
  donation = "20€";

  ngOnInit() {
    this.comunicacion.changeData(this.usuario);
  }

  changeType(type){
    
  	console.log(type);

  	if (type == 'number') {

  		this.donation = this.donation.replace(/€/g, '');

  	}else{

  		this.donation = this.donation + '€';

  	}

  	this.type = type;

  }

}
