import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ComunicacionService } from './comunicacion.service';
import * as moment from 'moment';
import { MenuController } from '@ionic/angular'; //import MenuController to access toggle() method.
//import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  user: string;
  hour: any;
  minute: any;
  second: any;
  tiempo: any = [];

  constructor(public nav: NavController, private service: ComunicacionService, public menuCtrl: MenuController) { 

    this.menuCtrl.toggle(); 

  }

  logout() {

    localStorage.removeItem('correo');
    this.nav.navigateRoot('home');

  }

  ngOnInit(){

    this.reloj();
    this.service.data$.subscribe(res => this.user = res);
    
    //localStorage.clear();

    if (localStorage.getItem('numeros') == '' || localStorage.getItem('numeros') == undefined || localStorage.getItem('fechas') == '' || localStorage.getItem('fechas') == undefined) {
      this.scrapping();
    }

    if (localStorage.getItem('u30') == '' || localStorage.getItem('u30') == undefined) {
      this.scrapping2();
    }

    let contador = parseInt(localStorage.getItem('contador'));
    // let horaClick = moment(localStorage.getItem('horaClick'));
    let hora = moment();
    /*let pm8 = moment(moment().format('YYYY-MM-DD 20:00'));
    let pm8p1 = moment(moment().format('YYYY-MM-DD 20:00')).add(1,'day');*/

    let pm8p1 = moment(moment().format('YYYY-MM-DD 20:00')).add(-1,'day');
    let diff = (pm8p1.diff(hora,'seconds'))/3600;
    let diff2 = moment(moment().format('YYYY-MM-DD 20:00')).diff(hora,'seconds')/3600;
    console.log(diff);

    /*if (diff >= 24 && hora > diff2) {
      
    }*/
    /*if (diff >= 24) {
      let pm8s1 = moment(moment().format('YYYY-MM-DD 20:00')).subtract(1,'day');

      diff = (hora.diff(pm8s1,'seconds'))/3600;

      console.log(diff);
      
    }else{

    }*/
    
    

  }
   //read t
  /*usuario(e){
  	this.user = e;
  }*/

  reloj(){

    let mostrar_hora = () => {

      let mins8 = moment(moment().format('YYYY-MM-DD 20:00'));
      let now;

      let restante = mins8.diff(moment(),'seconds');

      if (restante < 0) {
        now = moment(moment(new Date()).add(1,'days').format('YYYY-MM-DD 20:00'));
      }else{
        now = moment(moment().format('YYYY-MM-DD 20:00'));
      }
      
      let seconds = now.diff(moment(),'seconds');

      this.hour = Math.floor(Math.abs(seconds) / 3600);

      this.hour = (this.hour < 10)? '0' + this.hour : this.hour;

      this.minute = Math.floor((Math.abs(seconds) / 60) % 60);

      this.minute = (this.minute < 10)? '0' + this.minute : this.minute;

      this.second = Math.abs(seconds) % 60;

      this.second = (this.second < 10)? '0' + this.second : this.second;

      this.tiempo = [this.hour, this.minute, this.second];

      this.service.reloj(this.tiempo);

      if (this.hour == 0 && this.minute == 0 && this.second == 0) {

        console.log('El sorteo ha finalizado');
        localStorage.removeItem('numeros');
        localStorage.removeItem('fechas');
        localStorage.removeItem('dias');
        //localStorage.removeItem('ultimos');
        localStorage.removeItem('contador');
       
        /*this.service.reloj();*/

        /*this.service.hora$.subscribe((res: any) => {

          res.next(res.getValue().concat([this.hour]));

        });
        this.service.hora$.subscribe((res: any) => {

          res.next(res.getValue().concat([this.minute]));

        });
        this.service.hora$.subscribe((res: any) => {

          res.next(res.getValue().concat([this.second]));

        });*/
        
        this.scrapping();

       }
    }

    let intervalo = setInterval(mostrar_hora, 1000);

  }

  scrapping(){
    this.service.tabla().subscribe((data: any) => {

      let info = [data['dias'][0]];
      let info2 = [data['fechas'][0]];
      let info3 = [data['numeros'][0]];
      let dias = [];
      let fechas = [];
      let numeros = [];
      let ultimos = [];
      let meses = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];
      //let numbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; 
      // console.log(data);

      for (let i = 7; i >= 0; i--) {

        let obj = info[i];

        for (let key in obj) {

          dias.push(obj[key]);

        }

      }

      localStorage.setItem('dias', JSON.stringify(dias));

      for (let i = 7; i >= 0; i--) {

        let obj = info2[i];

        for (let key in obj) {

          fechas.push(obj[key]);

        }

      }

      for (let i = 0; i < fechas.length; ++i) {

        let mes =  moment().subtract(i, 'd').format('M');
        fechas[i] = moment().subtract(i, 'd').format('DD') + ' ' + meses[parseInt(mes)] + ' ' + moment().subtract(i, 'd').format('Y');
        //fechas[i] = fechas[i].replace(data, meses[i]);
        

      }

      console.log(fechas);
      localStorage.setItem('fechas', JSON.stringify(fechas));

      /*let _keys = Object.keys(info3[0]);

      for (let k in _keys) {

        let info = info3[0][_keys[k]];

        // console.log(info);

        for (var l = 0; l < info.length; l++) {
          numeros.push( info[l] );
        }

        // console.log(this.numeros);
        
        ultimos.push(numeros);
      }*/

      //localStorage.setItem('ultimos', JSON.stringify(ultimos));
      
      for (let i = 0; i <= 7; i++) {

        let obj = info3[i];

        for (let key in obj) {

          numeros.push(obj[key]);

        }

        /*for (let key in info3[i].dia1) {

          console.log('key',key);
          numeros.push(info3[i].dia1[key]);

        }*/

      }
      
      
      localStorage.setItem('numeros', JSON.stringify(numeros));

      // console.log(this.ultimes);
      //console.log(data['numeros'][0].dia1);

      // console.log(this.ultimes);

    }, Error => {
      console.log(Error)
    });
  }

  scrapping2(){
    this.service.tabla2().subscribe((data: any) => {

      let info = [data['dias'][0]];
      let info2 = [data['fechas'][0]];
      let info3 = [data['numeros'][0]];
      let dias = [];
      let fechas = [];
      let numeros = [];
      let ultimos = [];
      let meses = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];
      //let numbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; 
      // console.log(data);

      for (let i = 7; i >= 0; i--) {

        let obj = info[i];

        for (let key in obj) {

          dias.push(obj[key]);

        }

      }

      localStorage.setItem('u30d', JSON.stringify(dias));

      for (let i = 7; i >= 0; i--) {

        let obj = info2[i];

        for (let key in obj) {

          fechas.push(obj[key]);

        }

      }

      for (let i = 0; i < fechas.length; ++i) {

        let mes =  moment().subtract(i, 'd').format('M');
        fechas[i] = moment().subtract(i, 'd').format('DD') + ' ' + meses[parseInt(mes)] + ' ' + moment().subtract(i, 'd').format('Y');
        //fechas[i] = fechas[i].replace(data, meses[i]);
        

      }

      console.log(fechas);
      localStorage.setItem('u30f', JSON.stringify(fechas));

      /*let _keys = Object.keys(info3[0]);

      for (let k in _keys) {

        let info = info3[0][_keys[k]];

        // console.log(info);

        for (var l = 0; l < info.length; l++) {
          numeros.push( info[l] );
        }

        // console.log(this.numeros);
        
        ultimos.push(numeros);
      }*/

      //localStorage.setItem('ultimos', JSON.stringify(ultimos));
      
      for (let i = 0; i <= 7; i++) {

        let obj = info3[i];

        for (let key in obj) {

          numeros.push(obj[key]);

        }

        /*for (let key in info3[i].dia1) {

          console.log('key',key);
          numeros.push(info3[i].dia1[key]);

        }*/

      }
      
      
      localStorage.setItem('u30', JSON.stringify(numeros));

      // console.log(this.ultimes);
      //console.log(data['numeros'][0].dia1);

      // console.log(this.ultimes);

    }, Error => {
      console.log(Error)
    });
  }

}