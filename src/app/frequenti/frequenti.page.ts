import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-frequenti',
  templateUrl: './frequenti.page.html',
  styleUrls: ['./frequenti.page.scss'],
})
export class FrequentiPage implements OnInit {

  usuario: string = localStorage.getItem('usuario');
  // data1: any[] = [];
  // data2: any[] = [];
  numeros: any[] = [];
  // frecuencia: any[] = [];
  // numeros2: any[] = [];
  // frecuencia2: any[] = [];

  order = "ORDINA PER RISULTATI";

  constructor(private service: ComunicacionService) { }

  ngOnInit() {

  	this.service.changeData(this.usuario);

    if (localStorage.getItem('infrecuentes') && JSON.parse(localStorage.getItem('infrecuentes')).length > 0) {

      this.insertar();
      
    }

  }

  insertar(){

    let ultimos = JSON.parse(localStorage.getItem('e200n'));
    let frecuencia = [];

    for (let i = 1; i <= 55; i++) {

      let a = 0;

      for (let j in ultimos) {
        a+=ultimos[j].filter(x=>x==i).length
      }

      frecuencia.push({numero:i,frecuencia:a});
    }

    // console.log(frecuencia);

    let limit = 55;

    for (var h = 0; h < limit; h++) {
      if (frecuencia[h] !== undefined) {
        this.numeros.push({num:frecuencia[h].numero,freq:frecuencia[h].frecuencia || 0})
      }
    }

    // for (h = limit; h < limit*2; h++) {
    //   if (frecuencia[h] !== undefined) {
    //     this.numeros2.push({num:frecuencia[h].numero,freq:frecuencia[h].frecuencia || 0})
    //   }
    // }


      // this.data1 = JSON.parse(localStorage.getItem('frecuentes'));
      // this.data2 = JSON.parse(localStorage.getItem('frecuencia'));

      // this.numeros = [
      //   {num:this.data1[0],freq:this.data2[0]},
      //   {num:this.data1[1],freq:this.data2[1]},
      //   {num:this.data1[2],freq:this.data2[2]},
      //   {num:this.data1[3],freq:this.data2[3]},
      //   {num:this.data1[4],freq:this.data2[4]}];

      // this.numeros2 = [
      //   {num:this.data1[5],freq:this.data2[5]},
      //   {num:this.data1[6],freq:this.data2[6]},
      //   {num:this.data1[7],freq:this.data2[7]},
      //   {num:this.data1[8],freq:this.data2[8]},
      //   {num:this.data1[9],freq:this.data2[9]}];
  }

  ordenar(){
    if (this.order == "ORDINA PER NUMERO") {
      this.numeros = this.numeros.sort((a,b)=> a.num - b.num);
      // this.numeros2 = this.numeros2.sort((a,b)=> a.num - b.num);

      this.order = "ORDINA PER RISULTATI";
    }else{
      this.numeros = this.numeros.sort((a,b)=> b.freq - a.freq);
      // this.numeros2 = this.numeros2.sort((a,b)=> a.freq - b.freq);

      this.order = "ORDINA PER NUMERO";
    }
    

  }

}
