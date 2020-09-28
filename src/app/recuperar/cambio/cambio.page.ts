import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComunicacionService } from '../../comunicacion.service';
import { AlertController } from  '@ionic/angular';
import { Router } from  '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.page.html',
  styleUrls: ['./cambio.page.scss'],
})
export class CambioPage implements OnInit {

  contrasena: string;
  confirmar: string;
  contrasenac: string = "$a1e5i5o2u";

  constructor(private comunicacion: ComunicacionService, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
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

  cambio(){

    const encryptp = CryptoJS.AES.encrypt(this.contrasena, this.contrasenac).toString();

  	const json = {
  		"correo": localStorage.getItem('cambiomail'),
  		"password": encryptp

  	};

  	this.comunicacion.cambiar(json).subscribe((data:any) => {

  		if(data.respuesta == 'nousuario'){

          this.alerta('Utente non registrato');

        }else{

        	if (this.contrasena == this.confirmar) {

        		this.alerta('Modifica effettuata con successo');
        		localStorage.removeItem('cambiomail');
        		this.router.navigateByUrl('/home');

        	}else{
        		this.alerta('le passwords non corrispondono');
        	}
        }

  	}, Error =>{

  		this.alerta('Impossibile modificare la password');
  		console.log(Error);

  	});

  }

}
