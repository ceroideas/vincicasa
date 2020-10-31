import { Component } from '@angular/core';
import { Registro } from '../registro';
import { Sesion } from '../sesion';
import * as CryptoJS from 'crypto-js';
import { NgForm } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { Router } from  '@angular/router';
import { MenuController, NavController, AlertController, LoadingController } from  '@ionic/angular';
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
  valor = false;
  condiciones = false;

  constructor(public nav: NavController, public loading: LoadingController, public alertController: AlertController, private menu: MenuController, private comunicacion: ComunicacionService, private router: Router){
    this.menu.enable(false);
  }

  ngOnInit(){

    const ionSelects = document.querySelectorAll('ion-select');
    ionSelects.forEach((sel) => {
      sel.shadowRoot.querySelectorAll('.select-icon-inner')
        .forEach((elem) => {
          elem.setAttribute('style', 'display: none;');
        });
    });

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
  
  saveOnesignal()
  {
    if (localStorage.getItem('onesignal_id')) {
      let correo = localStorage.getItem('correo');
      let onesignal_id = localStorage.getItem('onesignal_id');

      this.comunicacion.saveOneSignalId({correo:correo,onesignal_id:onesignal_id})
      .subscribe(
        data => {console.log('ok');},
        err => {console.log(err);}
      );
    }
  }

  registrarse(f: NgForm){
    if (/*this.condiciones == false || */this.valor == false || this.formulario.correo == undefined || this.formulario.password == undefined || this.formulario.nombre == undefined || this.formulario.fecha == undefined || this.confirmar == undefined || this.formulario.sexo == undefined) {
      
      this.alerta('tutti i campi sono obbligatori');

    }else{

      if (this.formulario.password === this.confirmar) {

        const encryptp = CryptoJS.AES.encrypt(this.formulario.password, this.contrasena).toString();
        
        this.formulario.password = encryptp;
        this.formulario.fecha = moment(this.formulario.fecha).format('YYYY-MM-DD');
        this.formulario.datos = '';

        this.loading.create().then(l => {

          l.present();
          this.comunicacion.registros(this.formulario).subscribe((data:any) => {
            
            l.dismiss();

            if (data.respuesta === 'registrado') {
              
              this.alerta("L'utente esiste già");

            }else{

              localStorage.setItem('correo', this.formulario.correo);
              localStorage.setItem('usuario', JSON.stringify(data));
              if (data.datos != "") {
                localStorage.setItem('ufechas', data.datos);
              }
              localStorage.setItem('excluidos', data.excluidos != "" ? data.excluidos : "[]");
              localStorage.setItem('incluidos', data.incluidos != "" ? data.incluidos : "[]");
              localStorage.setItem('checks', data.reglas != "" ? data.reglas : "[]");

              this.saveOnesignal();

              this.router.navigateByUrl('/manual');

              this.router.navigate(['/manual']);


            }
          }, Error => {

            l.dismiss();

            console.log(Error);
            //this.error(Error);

          });
          


          }/*, e => {

            e.dismiss();

        }*/);

      }else{

        this.alerta('Le passwords non corrispondono');

      }
    }
  }

  sesion(f: NgForm){

    if (this.isesion.correo === 'admin' && this.isesion.password === 'admin12345') {

      this.router.navigateByUrl('/administracion');

    }else{

      if (this.isesion.correo == undefined || this.isesion.password == undefined) {
        
        this.alerta('tutti i campi sono obbligatori');

      }else{

        const encryptp = CryptoJS.AES.encrypt(this.isesion.password, this.contrasena).toString();
        /*const jsono = {
          correo: this.isesion.correo,
          password:*/ /*this.isesion.password = encryptp;*/
       // }

        this.loading.create().then(l => {

          l.present();

          this.comunicacion.sesion(this.isesion).subscribe((data:any) => {

            const contrasenadec = CryptoJS.AES.decrypt(data.respuesta.trim(), this.contrasena.trim()).toString(CryptoJS.enc.Utf8);
            //console.log(contrasenadec);

            l.dismiss();
            
            if(data.respuesta === 'nousuario'){

              // localStorage.setItem('correo', this.isesion.correo);
              // localStorage.setItem('usuario', JSON.stringify(data));
              // this.router.navigateByUrl('/feed');
              this.alerta("L'utente non esiste");

            }else{

              if (contrasenadec.toString() === this.isesion.password) {

                console.log(data, data.datos);

                localStorage.setItem('correo', this.isesion.correo);
                localStorage.setItem('usuario', JSON.stringify(data));
                if (data.datos != "") {
                  localStorage.setItem('ufechas', data.datos);
                }
                localStorage.setItem('excluidos', data.excluidos != "" ? data.excluidos : "[]");
                localStorage.setItem('incluidos', data.incluidos != "" ? data.incluidos : "[]");
                localStorage.setItem('checks', data.reglas != "" ? data.reglas : "[]");

                this.saveOnesignal();

                this.router.navigate(['/feed']);

              }else{
                
                this.alerta('Le passwords non corrispondono');
              
              }

            }
            
          }, Error => {

              l.dismiss();

              //this.error(Error);
              this.sesion(f);

              console.log(Error)

          });

          // l.dismiss();

        }/*, e => {

            e.dismiss();

        }*/);
        
      }

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
