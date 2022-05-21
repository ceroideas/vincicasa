import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.page.html',
  styleUrls: ['./seleccion.page.scss'],
})
export class SeleccionPage implements OnInit {

  numeros: any = [1, 6, 11, 16, 21, 26, 31, 36];
  numeros2: any = [2, 7, 12, 17, 22, 27, 32, 37];
  numeros3: any = [3, 8, 13, 18, 23, 28, 33, 38];
  numeros4: any = [4, 9, 14, 19, 24, 29, 34, 39];
  numeros5: any = [5, 10, 15, 20, 25, 30, 35, 40];
  combinacion: any = [];
  combinazione: any = [];
  final: any = [];
  colores: string;
  usuario: string = localStorage.getItem('usuario');

  returnBack = false;
  incluidos:any = [];

  constructor(private service: ComunicacionService, public nav: NavController) {
    if (localStorage.getItem('no-menu-return-back')) {
      this.returnBack = true;
    }
    this.incluidos = JSON.parse(localStorage.getItem('incluidos'));
  }

  ngOnInit() {

    this.service.changeData(this.usuario);
    if (localStorage.getItem('excluidos')) {

      this.combinacion = JSON.parse(localStorage.getItem('excluidos'));
      this.combinazione = this.combinacion.sort((a, b) => a - b);

      for(let i in this.incluidos) {
        let idx = this.combinacion.findIndex(x=>x==this.incluidos[i]);
        if (idx != -1) {
          this.combinacion.splice(idx,1);
        }
      }

      localStorage.setItem('excluidos', JSON.stringify(this.combinacion));

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

    for(let i in this.incluidos){
      if (this.incluidos[i] == numero){
        event.target.checked = false;
        return false;
      }
    }

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

    for(let i in this.incluidos){
      if (this.incluidos[i] == numero){
        event.target.checked = false;
        return false;
      }
    }

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

    this.actualizar();

  }

  actualizar()
  {
   let correo = {

    correo: localStorage.getItem('correo'),
    combinaciones: localStorage.getItem('ufechas') || "",
    incluidos: localStorage.getItem('incluidos')  || "",
    excluidos: localStorage.getItem('excluidos')  || "",
    reglas: localStorage.getItem('checks')  || "",
    lastNotification: localStorage.getItem('last-notification') || "",
    lastClick: localStorage.getItem('horaClick') || "",
   };

    console.log(correo,"correo");

    this.service.actualizar_combinaciones(correo).subscribe((data:any) => {

      console.log('Datos actualizados');

    }, Error => {

      console.log(Error);

    });
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