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

    let jsono = {
      correo: this.correo,
      usuario: JSON.parse(this.usuario).nombre,
      monto: this.monto
    };

    this.payPal.init({

      PayPalEnvironmentProduction: "",
      PayPalEnvironmentSandbox: "AQqESLpygMijp3fD-ES9ZTQ9zjC_DmBT6khWDMfhLQylfpa_pAwIsgHxpYsj8Nyn3DrZG1iEQVuPjRFe"

    }).then(() => {
      this.payPal.prepareToRender("PayPalEnvironmentSandbox", new PayPalConfiguration({

        // acceptCreditCards: true,
        languageOrLocale: 'it-IT',
        // merchantName: '',
        // merchantPrivacyPolicyURL: '',
        // merchantUserAgreementURL: ''

      })).then(() => {

        // let detalles = new PayPalPaymentDetails(this.monto.toString(), '0.00', '0.00');
        let pago = new PayPalPayment(this.monto.toString(), 'EUR', 'Donazione Millionday', 'sale'/*, detalles*/);
        this.payPal.renderSinglePaymentUI(pago).then(() => {

          // this.alerta('Pagamento effettuato con successo');

          this.comunicacion.pago(jsono).subscribe((data:any)=>{ 

            this.alerta('Donazione effettuata con successo');

            this.monto = "";

          }, Error => {

            this.alerta('Errore durante il pagamento');
            console.log(Error);

          });

        }, () =>{

          this.alerta('Errore durante il pagamento');

        })

      })

    });

  }

}
