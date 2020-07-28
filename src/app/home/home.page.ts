import { Component } from '@angular/core';
import { Registro } from '../registro';
import { Sesion } from '../sesion';
import * as CryptoJS from 'crypto-js';
import { NgForm } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from  '@angular/router';
import { MenuController } from  '@ionic/angular';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';

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

  constructor(public alertController: AlertController, private menu: MenuController, private comunicacion: ComunicacionService, private router: Router){
    this.menu.enable(false);
  }

  ngOnInit(){
    localStorage.removeItem('correo');
    
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
      
      //alert('Todos los campos son obligatorios');
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
            
            //console.log(data.respuesta);
            //alert('Usuario ya existe');
            this.alerta('Usuario ya existe');

          }else{

            localStorage.setItem('usuario', this.formulario.correo);
            this.router.navigateByUrl('/manual');

          }
        }, Error => {

          //console.log(Error);
          this.error(Error);

        });

      }else{

        //alert("Las contraseñas no coinciden");
        this.alerta('Las contraseñas no coinciden');

      }
    }
  }

  sesion(f: NgForm){

    if (this.isesion.correo == undefined || this.isesion.password == undefined) {
      
      //alert('Todos los campos son obligatorios');
      this.alerta('Todos los campos son obligatorios');

    }else{

      localStorage.setItem('correo', this.isesion.correo);
      const encryptp = CryptoJS.AES.encrypt(this.isesion.password, this.contrasena).toString();
      const jsono = {
        correo: this.isesion.correo,
        password: encryptp
      }
      this.comunicacion.sesion(jsono).subscribe((data:any) => {

        const contrasenadec = CryptoJS.AES.decrypt(data.respuesta.trim(), this.contrasena.trim()).toString(CryptoJS.enc.Utf8);
        
        if(data.respuesta == 'nousuario'){

          //alert('Usuario no registrado');
          this.alerta('Usuario no registrado');

        }else{

          if (contrasenadec === this.isesion.password) {

            this.router.navigateByUrl('/feed');

          }else{
            
            //alert('Las contraseñas no coinciden');
            this.alerta('Las contraseñas no coinciden');
          
          }

        }
        
      }, Error => {

          //console.log(Error);
          this.error(Error);

      });
    }
    
  }

  cambio(event){

  	const sesion = document.getElementById("container2");
  	const formulario = document.getElementById("container");

  	if (sesion.style.display = 'none') {
  		formulario.style.display = 'none';
  		sesion.style.display = 'block';
  	}
  }

  cambio2(event){

  	const sesion = document.getElementById("container2");
  	const formulario = document.getElementById("container");

  	if (formulario.style.display = 'none') {
  		sesion.style.display = 'none';
  		formulario.style.display = 'block';
  	}

  }

}
