import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { AlertController, NavController, LoadingController } from  '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo: string;

  step = 1;

  codigo;

  constructor(private comunicacion: ComunicacionService, public alertController: AlertController, public nav: NavController, public load: LoadingController) { }

  makeid() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  ngOnInit() {
  }

  async alerta(alerta) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Avviso:',
      subHeader: '',
      message: alerta,
      buttons: ['OK']
    });

    await alert.present();
  }

  cambio(){

    this.load.create().then(l=>{
      l.present();

      let codigo = this.makeid();

      localStorage.setItem('codigo',codigo);

    	this.comunicacion.recuperar(this.correo,codigo).subscribe((data:any) => {

        l.dismiss();

    		if(data.respuesta == 'nousuario'){

            this.alerta('Usuario no registrado');

          }else{

            this.alerta('Controlla la tua email ed inserisci il codice ricevuto');
            localStorage.setItem("cambiomail", this.correo);

            this.step = 2;

          }

    	}, Error =>{

        l.dismiss();

    		this.alerta('Invio fallito');
    		console.log(Error);

    	});
    })

  }

  confirm()
  {
    if (localStorage.getItem('codigo') == this.codigo) {
      this.nav.navigateRoot('recuperar/cambio');
    }else{
      this.alerta('Il codice non è corretto');
    }
  }
  
}
