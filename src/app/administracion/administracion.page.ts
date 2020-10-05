import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { ComunicacionService } from '../comunicacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {

	datos: any;
	funcion: string = 'USUARIOS';

  constructor(private comunicacion: ComunicacionService, public nav: NavController) { }

  ngOnInit() {

  	this.activador(this.funcion);

  }

  activador(nombres){

  	if (nombres === 'USUARIOS') {

      this.funcion = nombres;

      let name = [], 
        correos = [], 
        fechas = [], 
        sexos = [];

      this.comunicacion.usuarios().subscribe((data: any) => {

        let dato;
        let json = data;

        for (let i = 0; i < data.usuarios.length; i++) {

          dato = json.usuarios[i].nombre;

          name.push(dato.toString());
    
        }

        for (let i = 0; i < data.usuarios.length; i++) {

          dato = json.usuarios[i].correo;

          correos.push(dato.toString());
    
        }

        for (let i = 0; i < data.usuarios.length; i++) {

          dato = json.usuarios[i].fechan;

          fechas.push(moment(dato).format('YYYY-MM-DD').toString());
    
        }

        for (let i = 0; i < data.usuarios.length; i++) {

          dato = json.usuarios[i].sexo;

          sexos.push(dato.toString());
    
        }

      }, Error => {

        console.log(Error);

      });

      console.log(correos, fechas, name, sexos);

      this.datos = { 
        correos: correos, 
        fechas: fechas, 
        nombres: name, 
        sexos: sexos
      };

      console.log(this.datos);

  	}else if (nombres === 'DONADORES') {

      this.comunicacion.ganadores().subscribe((data: any) => {
        
      });
  		
  		this.funcion = nombres;

  		this.datos = {
			campo: ['Reinaldo Branchi', 'Jorge Solano'],
			campo2: ['3$', '20$']
		};

  	}else{

      this.funcion = 'GANADORES';

      let numeros = [], 
        correos = [], 
        fechas = [], 
        aciertos = [];

      this.comunicacion.ganadores().subscribe((data: any) => {

        let dato;
        let json = data;

        for (let i = 0; i < data.ganadores.length; i++) {

          dato = json.ganadores[i].numero;

          if (json.ganadores[i].aciertos > 0) {

            numeros.push(dato.toString()); 

          }
    
        }

        for (let i = 0; i < data.ganadores.length; i++) {

          dato = json.ganadores[i].usuario;

          if (json.ganadores[i].aciertos > 0) {

            correos.push(dato.toString());

          }
    
        }

        for (let i = 0; i < data.ganadores.length; i++) {

          dato = json.ganadores[i].fjugada;

          if (json.ganadores[i].aciertos > 0) {

            fechas.push(moment(dato).format('YYYY-MM-DD').toString());

          }
    
        }

        for (let i = 0; i < data.ganadores.length; i++) {

          dato = json.ganadores[i].aciertos;

          if (json.ganadores[i].aciertos > 0) {

            aciertos.push(dato.toString());

          }
    
        }

      }, Error => {

        console.log(Error);

      });

      console.log(correos, fechas, numeros, aciertos);

      this.datos = { 
        correos: correos, 
        fechas: fechas, 
        numeros: numeros, 
        aciertos: aciertos
      };

      console.log(this.datos);

  	}

  }

  salir(){

  	localStorage.removeItem('usuario');
    localStorage.removeItem('correo');
    localStorage.removeItem('excluidos');
    localStorage.removeItem('incluidos');
    this.nav.navigateRoot('home');

  }

}
