import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

declare let paypal: any;

@Component({
  selector: 'app-dona',
  templateUrl: './dona.page.html',
  styleUrls: ['./dona.page.scss'],
})
export class DonaPage implements OnInit, AfterViewChecked {

  usuario: string = localStorage.getItem('usuario');
  correo: string = localStorage.getItem('correo');
  monto: any;

  paypalConfig:any = {
    locale: "it_IT",
    style: {
      size:"large",
      color:"white"
    },
    env: 'sandbox', // Optional: specify 'sandbox' environment
    client: {
      sandbox:    'AQqESLpygMijp3fD-ES9ZTQ9zjC_DmBT6khWDMfhLQylfpa_pAwIsgHxpYsj8Nyn3DrZG1iEQVuPjRFe',
      production: ''
    },
    commit: true, // Optional: show a 'Pay Now' button in the checkout flow
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: this.monto,
                currency: 'EUR'
              }
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      // Optional: display a confirmation page here

      return actions.payment.execute()
        .then( () => {

          let jsono = {
            correo: this.correo,
            usuario: JSON.parse(this.usuario).nombre,
            monto: this.monto.toString()
          };

          this.comunicacion.pago(jsono).subscribe((data:any)=>{ 

            this.alerta('Donazione effettuata con successo');

            this.monto = "";

          }, Error => {

            this.alerta('Errore durante il pagamento - code 200');
            console.log(Error);

          });

          // Show a success page to the buyer
          console.log('donado')
        });
      }
  }

  constructor(private comunicacion: ComunicacionService, private payPal: PayPal, public alertController: AlertController) { }

  ngOnInit() {
    this.comunicacion.changeData(this.usuario);
    this.addPaypalScript().then(()=>{
      paypal.Button.render(this.paypalConfig,'#paypal-checkout-button')
    })
  }

  ionViewDidLoad()
  {
  }

  ngAfterViewChecked():void {
    
  }

  async alerta(alerta) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Avvertimento:',
      subHeader: '',
      message: alerta,
      buttons: ['OK']
    });

    await alert.present();
  }

  comprar(){

    (document.getElementsByClassName('paypal-button-number-0')[0] as HTMLElement).click();

    // this.payPal.init({

    //   PayPalEnvironmentProduction: "",
    //   PayPalEnvironmentSandbox: "AQqESLpygMijp3fD-ES9ZTQ9zjC_DmBT6khWDMfhLQylfpa_pAwIsgHxpYsj8Nyn3DrZG1iEQVuPjRFe"

    // }).then(() => {
    //   this.payPal.prepareToRender("PayPalEnvironmentSandbox", new PayPalConfiguration({

    //     // acceptCreditCards: true,
    //     languageOrLocale: 'it-IT',
    //     // merchantName: '',
    //     // merchantPrivacyPolicyURL: '',
    //     // merchantUserAgreementURL: ''

    //   })).then(() => {

    //     // let detalles = new PayPalPaymentDetails(this.monto.toString(), '0.00', '0.00');
    //     let pago = new PayPalPayment(this.monto.toString(), 'EUR', 'Donazione Millionday', 'sale'/*, detalles*/);
    //     this.payPal.renderSinglePaymentUI(pago).then(() => {

    //       // this.alerta('Pagamento effettuato con successo');

    //       this.comunicacion.pago(jsono).subscribe((data:any)=>{ 

    //         this.alerta('Donazione effettuata con successo');

    //         this.monto = "";

    //       }, Error => {

    //         this.alerta('Errore durante il pagamento');
    //         console.log(Error);

    //       });

    //     }, () =>{

    //       this.alerta('Errore durante il pagamento');

    //     })

    //   })

    // });

  }

  addScript;

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve,reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

}
