import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { AlertController } from  '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo: string;

  constructor(private comunicacion: ComunicacionService, public alertController: AlertController) { }

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

  	this.comunicacion.recuperar(this.correo).subscribe((data:any) => {

  		if(data.respuesta == 'nousuario'){

          this.alerta('Usuario no registrado');

        }else{

          this.alerta('conferma la tua email');
          localStorage.setItem("cambiomail", this.correo);

        }

  	}, Error =>{

  		this.alerta('Invio fallito');
  		console.log(Error);

  	});

  }
  
}
