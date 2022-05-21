import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-frequenti',
  templateUrl: './frequenti.page.html',
  styleUrls: ['./frequenti.page.scss'],
})
export class FrequentiPage implements OnInit {

  usuario: string = localStorage.getItem('usuario');
  numeros: any[] = [];
  orden = 50;
  order = "ORDINA PER NUMERO";

  constructor(private service: ComunicacionService) { }

  ngOnInit() {

  	this.service.changeData(this.usuario);
    this.insertar();

  }

  insertar(){

    let ultimos = JSON.parse(localStorage.getItem('e200n'));
    let frecuencia = [];

    for (let i = 1; i <= 40; i++) {

      let a = 0;

      for (let j in ultimos) {
        a+=ultimos[j].filter(x=>x==i).length
      }

      frecuencia.push({numero:i,frecuencia:a});
    }

    let limit = 40;

    for (var h = 0; h < limit; h++) {

      if (frecuencia[h] !== undefined) {

        this.numeros.push({num:frecuencia[h].numero,freq:frecuencia[h].frecuencia || 0})

      }

    }

  }

  abrir(){

    if (document.getElementById("estracciones1").style.display == 'none') {

      document.getElementById("estracciones1").style.display = "block";

    }else{

      document.getElementById("estracciones1").style.display = 'none';

    }
  }

  cerrar(){

    document.getElementById("estracciones1").style.display = "none";

  }

  ordenar(valor){

     if (valor == 50) {

        this.orden = 50;
        this.numeros = this.numeros.sort((a,b)=> a.num - b.num);
        this.order = "ORDINA PER NUMERO";

        this.cerrar();

     }else{

       this.orden = 100;
       this.numeros = this.numeros.sort((a,b)=> b.freq - a.freq);
       this.order = "ORDINA PER PIÙ FREQUENTE";

       this.cerrar();

     }

  }

}
