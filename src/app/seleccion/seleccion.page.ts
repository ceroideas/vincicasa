import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.page.html',
  styleUrls: ['./seleccion.page.scss'],
})
export class SeleccionPage implements OnInit {

  numeros: any = [1, 8, 15, 22, 29, 36, 43, 50];
  numeros2: any = [2, 9, 16, 23, 30, 36, 44, 51];
  numeros3: any = [3, 10, 17, 24, 31, 37, 45, 52];
  numeros4: any = [4, 11, 18, 25, 32, 38, 46, 53];
  numeros5: any = [5, 12, 19, 26, 33, 39, 47, 54];
  numeros6: any = [6, 13, 20, 27, 34, 40, 48, 55];
  numeros7: any = [7, 14, 21, 28, 35, 41, 49];
  combinacion: any = [];
  combinazione: any = [];
  final: any = [];
  colores: string;
  usuario: string = localStorage.getItem('usuario');

  returnBack = false;

  constructor(private service: ComunicacionService, public nav: NavController) {
    if (localStorage.getItem('no-menu-return-back')) {
      this.returnBack = true;
    }
  }

  ngOnInit() {

    this.service.changeData(this.usuario);
    if (localStorage.getItem('excluidos')) {

      this.combinacion = JSON.parse(localStorage.getItem('excluidos'));
      this.combinazione = this.combinacion.sort((a, b) => a - b);

    }

    this.obtener_excluidos();
    
  }

  obtener_excluidos(){
    let obtener = () => {

      let checks;
      console.log(this.combinacion);

      for (let i = 0; i < this.combinacion.length; ++i) {

        checks = document.getElementById('numero' + this.combinacion[i]);
        checks.checked = true;

      }
    }
  }

  seleccionar (event, numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();

    if (event.target.checked && this.combinacion.length < 5) {


      this.combinacion.push(seleccion);

    }else{

      event.target.checked = false;
      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {

        this.combinacion.splice(index, 1);

      }

    }

    console.log(this.combinacion);


    this.combinazione = this.combinacion.sort((a, b) => a - b);
    
  }

  seleccionar2 (event, numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();

    if (event.target.checked && this.combinacion.length < 5) {


      this.combinacion.push(seleccion);

    }else{

      event.target.checked = false;
      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {

        this.combinacion.splice(index, 1);

      }

    }

    console.log(this.combinacion);
    
    this.combinazione = this.combinacion.sort((a, b) => a - b);

  }

  guardar(){

    let excluidos = [];

    for (let i = 0; i < this.combinacion.length; ++i) {

      excluidos.push(this.combinacion[i]); 

    }

    localStorage.removeItem('excluidos');
    localStorage.setItem('excluidos', JSON.stringify(excluidos));
    this.nav.navigateRoot('feed');

  }

  espalda(){

    let checks;

    for (let i = 0; i < this.combinacion.length; ++i) {

      checks = document.getElementById('numero' + this.combinacion[i]);
      checks.checked = false;

    }

    this.combinacion = [];
    localStorage.removeItem('excluidos');

    
  }

  goToCombinazione()
  {
    let excluidos = [];

    for (let i = 0; i < this.combinacion.length; ++i) {

      excluidos.push(this.combinacion[i]); 

    }

    localStorage.removeItem('excluidos');
    localStorage.setItem('excluidos', JSON.stringify(excluidos));
    
    localStorage.removeItem('no-menu-return-back');
    localStorage.setItem('random','1');
    this.nav.navigateRoot('combinazione');
  }

}