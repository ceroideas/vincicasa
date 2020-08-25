import { Component } from '@angular/core';
import { Registro } from '../registro';
import { Sesion } from '../sesion';
import * as CryptoJS from 'crypto-js';
import { NgForm } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from  '@angular/router';
import { MenuController, NavController, AlertController } from  '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  confirmar: string;
  formulario = new Registro();
  isesion = new Sesion();
  contrasena: string = "$a1e5i5o2u";

  constructor(public nav: NavController, public alertController: AlertController, private menu: MenuController, private comunicacion: ComunicacionService, private router: Router){
    this.menu.enable(false);
  }

  ngOnInit(){

    if (localStorage.getItem('correo')) {
      this.nav.navigateRoot('feed');
    }
    
  }

  async error(problema) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error:',
      subHeader: '',
      message: problema,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alerta(alerta) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia:',
      subHeader: '',
      message: alerta,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  registrarse(f: NgForm){
    if (this.formulario.correo == undefined || this.formulario.password == undefined || this.formulario.nombre == undefined || this.formulario.fecha == undefined || this.confirmar == undefined) {
      
      this.alerta('Todos los campos son obligatorios');

    }else{

      if (this.formulario.password == this.confirmar) {

        const encryptp = CryptoJS.AES.encrypt(this.formulario.password, this.contrasena).toString();
        const jsono = {
          nombre: this.formulario.nombre,
          correo: this.formulario.correo,
          fecha: this.formulario.fecha,
          password: encryptp
        }
        
        this.comunicacion.registros(jsono).subscribe((data:any) => {
          if (data.respuesta == 'registrado') {
            
            this.alerta('Usuario ya existe');

          }else{

            localStorage.setItem('correo', this.formulario.correo);
            localStorage.setItem('usuario', this.formulario.nombre);
            this.router.navigateByUrl('/manual');

          }
        }, Error => {

          this.error(Error);

        });

      }else{

        this.alerta('Las contraseñas no coinciden');

      }
    }
  }

  sesion(f: NgForm){

    if (this.isesion.correo == undefined || this.isesion.password == undefined) {
      
      this.alerta('Todos los campos son obligatorios');

    }else{

      const encryptp = CryptoJS.AES.encrypt(this.isesion.password, this.contrasena).toString();
      const jsono = {
        correo: this.isesion.correo,
        password: encryptp
      }
      this.comunicacion.sesion(jsono).subscribe((data:any) => {

        const contrasenadec = CryptoJS.AES.decrypt(data.respuesta.trim(), this.contrasena.trim()).toString(CryptoJS.enc.Utf8);
        
        if(data.respuesta == 'nousuario'){

          this.alerta('Usuario no registrado');

        }else{

          if (contrasenadec === this.isesion.password) {

            localStorage.setItem('correo', this.isesion.correo);
            localStorage.setItem('usuario', data.nombre);
            this.router.navigateByUrl('/feed');

          }else{
            
            this.alerta('Las contraseñas no coinciden');
          
          }

        }
        
      }, Error => {

          this.error(Error);

      });
    }
    
  }

  cambio(){

  	const sesion = document.getElementById("container2");
  	const formulario = document.getElementById("container");

  	if (sesion.style.display = 'none') {
  		formulario.style.display = 'none';
  		sesion.style.display = 'block';
  	}
  }

  cambio2(){

  	const sesion = document.getElementById("container2");
  	const formulario = document.getElementById("container");

  	if (formulario.style.display = 'none') {
  		sesion.style.display = 'none';
  		formulario.style.display = 'block';
  	}

  }

}
