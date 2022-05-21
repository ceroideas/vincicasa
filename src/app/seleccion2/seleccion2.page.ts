import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-seleccion2',
  templateUrl: './seleccion2.page.html',
  styleUrls: ['./seleccion2.page.scss'],
})
export class Seleccion2Page implements OnInit {

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

  constructor(public alertController: AlertController, private service: ComunicacionService, public nav: NavController) { }

  ngOnInit() {

    this.service.changeData(this.usuario);
    if (localStorage.getItem('incluidos')) {

      this.combinacion = JSON.parse(localStorage.getItem('incluidos'));
      this.combinazione = this.combinacion.sort((a, b) => a - b);

    }

    this.obtener_incluidos();
    
  }

  obtener_incluidos(){
    let obtener = () => {

      let checks;
      console.log(this.combinacion);

      for (let i = 0; i < this.combinacion.length; ++i) {

        checks = document.getElementById('numero' + this.combinacion[i]);
        checks.checked = true;

      }
    }
  }

  async error(problema) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta:',
      subHeader: '',
      message: problema,
      buttons: ['OK']
    });

    await alert.present();
  }

  seleccionar (event, numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();
    let excluidos = JSON.parse(localStorage.getItem('excluidos'));

    if (event.target.checked && this.combinacion.length < 2) {


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

    if (event.target.checked && this.combinacion.length < 2) {


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

    let incluidos = [];

    for (let i = 0; i < this.combinacion.length; ++i) {

      incluidos.push(this.combinacion[i]); 

    }

    localStorage.removeItem('incluidos');
    localStorage.setItem('incluidos', JSON.stringify(incluidos));
    this.nav.navigateRoot('seleccion');

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
    localStorage.removeItem('incluidos');

    
  }

}
