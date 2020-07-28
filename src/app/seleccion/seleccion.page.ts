import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';

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
  usuario: string = localStorage.getItem('correo');

  constructor(private service: ComunicacionService) { }

  ngOnInit() {
    this.service.changeData(this.usuario);
  }

  seleccionar (numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();
    let elemento = document.getElementById(valor);

    if (elemento.style.backgroundImage == 'none') {

      if (this.combinacion.length < 5) {

        elemento.style.backgroundImage = 'url(' +  '/assets/fondo-numero-rojo-verde.png' + ')';
        elemento.style.backgroundPosition = 'center';
        elemento.style.backgroundRepeat = 'no-repeat';
        elemento.style.height = '100%';

        if (window.matchMedia("(min-height: 650px)").matches) {

          elemento.style.backgroundSize = '27.5px' + ' ' + '32.5px';

        }else if (window.matchMedia("(min-height: 560px)").matches) {

          elemento.style.backgroundSize = '32.5px' + ' ' + '32.5px';
          
        }if (window.matchMedia("(min-height: 1024px)").matches) {
          
          elemento.style.backgroundSize = '45px' + ' ' + '45px';

        }if (window.matchMedia("(min-height: 1300px)").matches) {
          
          elemento.style.backgroundSize = '55px' + ' ' + '55px';

        } else {

          elemento.style.backgroundSize = '32.5px' + ' ' + '37.5px';

        }

        this.combinacion.push(seleccion);

      }

    }else{

      elemento.style.backgroundImage = 'none';

      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {
        this.combinacion.splice(index, 1);
      }

    }

    this.combinazione = this.combinacion.sort((a, b) => a - b);
    
  }

  seleccionar2 (numero){

    let seleccion = numero;
    let valor = 'numero' + numero.toString();
    let elemento = document.getElementById(valor);

    if (elemento.style.backgroundImage == 'none') {

      if (this.combinacion.length < 5) {

        elemento.style.backgroundImage = 'url(' +  '/assets/fondo-numero-azul-verde.png' + ')';
        elemento.style.backgroundPosition = 'center';
        elemento.style.backgroundRepeat = 'no-repeat';
        elemento.style.height = '100%';

        if (window.matchMedia("(min-height: 650px)").matches) {

          elemento.style.backgroundSize = '27.5px' + ' ' + '32.5px';

        }else if (window.matchMedia("(min-height: 560px)").matches) {

          elemento.style.backgroundSize = '32.5px' + ' ' + '32.5px';

        }if (window.matchMedia("(min-height: 1024px)").matches) {
          
          elemento.style.backgroundSize = '45px' + ' ' + '45px';

        }if (window.matchMedia("(min-height: 1300px)").matches) {
          
          elemento.style.backgroundSize = '55px' + ' ' + '55px';

        } else {

          elemento.style.backgroundSize = '32.5px' + ' ' + '37.5px';

        }

        this.combinacion.push(seleccion);

      }

    }else{

      elemento.style.backgroundImage = 'none';
      
      const index = this.combinacion.indexOf(seleccion);

      if (index > -1) {
        this.combinacion.splice(index, 1);
      }

    }
    
    this.combinazione = this.combinacion.sort((a, b) => a - b);

  }

}
