import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.page.html',
  styleUrls: ['./dona.page.scss'],
})
export class DonaPage implements OnInit {

  usuario: string = localStorage.getItem('usuario');
  correo: string = localStorage.getItem('correo');
  monto: any;

  constructor(private comunicacion: ComunicacionService, private payPal: PayPal, public alertController: AlertController) { }

  type = "text";
  donation = "20€";

  ngOnInit() {
    this.comunicacion.changeData(this.usuario);
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

  changeType(type){
    
  	console.log(type);

  	if (type == 'number') {

  		this.donation = this.donation.replace(/€/g, '');

  	}else{

  		this.donation = this.donation + '€';

  	}

  	this.type = type;

  }

  comprar(){

    this.payPal.init({

      PayPalEnvironmentProduction: "",
      PayPalEnvironmentSandbox: "client id"

    }).then(() => {
      this.payPal.prepareToRender("PayPalEnvironmentSandbox", new PayPalConfiguration({

        acceptCreditCards: true,
        languageOrLocale: 'it-IT',
        merchantName: '',
        merchantPrivacyPolicyURL: '',
        merchantUserAgreementURL: ''

      })).then(() => {

        let detalles = new PayPalPaymentDetails(this.monto.toString(), '0.00', '0.00');
        let pago = new PayPalPayment(this.monto.toString(), 'EUR', '', 'Sale', detalles);
        this.payPal.renderSinglePaymentUI(pago).then((Response) => {

          this.alerta('Pagamento effettuato con successo');

        }, () =>{

          this.alerta('Errore durante il pagamento');

        })

      })

    });

  }

}
