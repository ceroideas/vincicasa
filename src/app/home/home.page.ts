import { Component } from '@angular/core';
import { Registro } from '../registro';
import { Sesion } from '../sesion';
import * as CryptoJS from 'crypto-js';
import { NgForm } from '@angular/forms';
import { ComunicacionService } from '../comunicacion.service';
import { EventsService } from '../services/events.service';
import { TodayPage } from '../feed/today/today.page';
import { Router } from  '@angular/router';
import { MenuController, NavController, AlertController, LoadingController, ModalController } from  '@ionic/angular';
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
  cn:string;

  constructor(public nav: NavController, public loading: LoadingController, public alertController: AlertController, private menu: MenuController,
    private comunicacion: ComunicacionService, private router: Router, public events: EventsService, public modal: ModalController){
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

  async presentModal()
  {
    const modal = await this.modal.create({
      component: TodayPage,
      cssClass: "todayModal"
    });
    return await modal.present();
  }
  
  saveOnesignal()
  {
    this.events.publish('programarNotificaciones');
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
    if (/*this.condiciones == false || */this.valor == false || this.formulario.correo == undefined || this.cn == undefined || this.formulario.nombre == undefined || this.formulario.fecha == undefined || this.confirmar == undefined || this.formulario.sexo == undefined) {
      
      this.alerta('tutti i campi sono obbligatori');

    }else{

      if (this.cn === this.confirmar) {

        const encryptp = CryptoJS.AES.encrypt(this.cn, this.contrasena).toString();
        
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
              if (data.datos != "" && data.datos != "[]") {
                // localStorage.setItem('ufechas', data.datos);
                localStorage.setItem('ufechas', data.datos);
              }
              // localStorage.setItem('ufechas', data.datos == "" ? "[]" : data.datos);
              localStorage.setItem('excluidos', data.excluidos != "" ? data.excluidos : "[]");
              localStorage.setItem('incluidos', data.incluidos != "" ? data.incluidos : "[]");
              localStorage.setItem('checks', data.reglas != "" ? data.reglas : "[]");
              if (data.lastNotification) {
                localStorage.setItem('last-notification', data.lastNotification);
              }
              if (data.lastClick) {
                localStorage.setItem('horaClick', data.lastClick);
                
                console.log(moment().diff(moment(data.lastClick),'seconds')/3600);

                if (moment().diff(moment(data.lastClick),'seconds')/3600 <= 24) {
                  localStorage.setItem('contador','1');
                }else{
                  localStorage.removeItem('contador');
                }
              }else{
                  localStorage.removeItem('contador');
                  localStorage.removeItem('horaClick');
              }

              this.saveOnesignal();

              this.router.navigateByUrl('/manual');

              this.presentModal();

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

                // console.log(data, data.datos);

                localStorage.setItem('correo', this.isesion.correo);
                localStorage.setItem('usuario', JSON.stringify(data));
                if (data.datos != "" && data.datos != "[]") {
                  localStorage.setItem('ufechas', data.datos);
                  localStorage.setItem('combinacion', '['+JSON.parse(data.datos)[0].combinacion+']');
                }
                // localStorage.setItem('ufechas', data.datos == "" ? "[]" : data.datos);
                localStorage.setItem('excluidos', data.excluidos != "" ? data.excluidos : "[]");
                localStorage.setItem('incluidos', data.incluidos != "" ? data.incluidos : "[]");
                localStorage.setItem('checks', data.reglas != "" ? data.reglas : "[]");

                if (data.lastNotification) {
                  localStorage.setItem('last-notification', data.lastNotification);
                }
                if (data.lastClick) {
                  localStorage.setItem('horaClick', data.lastClick);
                  
                  console.log(moment().diff(moment(data.lastClick),'seconds')/3600);

                  if (moment().diff(moment(data.lastClick),'seconds')/3600 <= 24) {
                    localStorage.setItem('contador','1');
                  }else{
                    localStorage.removeItem('contador');
                  }
                }else{
                    localStorage.removeItem('contador');
                }

                this.saveOnesignal();

                this.presentModal();

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
