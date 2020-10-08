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
	funcion: string = 'UTENTI';

  constructor(private comunicacion: ComunicacionService, public nav: NavController) { }

  ngOnInit() {

  	this.activador(this.funcion);

  }

  activador(nombres){

  	if (nombres === 'UTENTI') {

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

      //console.log(correos, fechas, name, sexos);

      this.datos = { 
        correos: correos, 
        fechas: fechas, 
        nombres: name, 
        sexos: sexos
      };

      //console.log(this.datos);

  	}else if (nombres === 'DONATORI') {

      this.funcion = nombres;

      let usuarios = [], 
        correos = [], 
        fechas = [], 
        montos = [];

      this.comunicacion.donadores().subscribe((data: any) => {

        let dato;
        let json = data;

        for (let i = 0; i < data.donadores.length; i++) {

          dato = json.donadores[i].usuario;

          usuarios.push(dato.toString());
    
        }

        for (let i = 0; i < data.donadores.length; i++) {

          dato = json.donadores[i].correo;

          correos.push(dato.toString());
    
        }

        for (let i = 0; i < data.donadores.length; i++) {

          dato = json.donadores[i].fecha;

          fechas.push(moment(dato).format('YYYY-MM-DD').toString());
    
        }

        for (let i = 0; i < data.donadores.length; i++) {

          dato = json.donadores[i].monto;

          montos.push(dato.toString());
    
        }

      }, Error => {

        console.log(Error);

      });

      console.log(correos, fechas, usuarios, montos);

      this.datos = { 
        correos: correos, 
        fechas: fechas, 
        usuarios: usuarios, 
        montos: montos
      };

      console.log(this.datos);

  	}else{

      this.funcion = 'VINCITORI';

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

      //console.log(correos, fechas, numeros, aciertos);

      this.datos = { 
        correos: correos, 
        fechas: fechas, 
        numeros: numeros, 
        aciertos: aciertos
      };

      //console.log(this.datos);

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
