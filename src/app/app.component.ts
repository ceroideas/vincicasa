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

    if (localStorage.getItem('e200') == '' || localStorage.getItem('e200') == undefined) {
      this.scrapping3();
    }

    let horaClick = moment(localStorage.getItem('horaClick'));
    let hora = moment();

    let pm8 = moment(moment().format('YYYY-MM-DD 20:00'));
    let pm8p1 = moment(moment().format('YYYY-MM-DD 20:00')).add(1,'day');

    let diff = (pm8p1.diff(hora,'seconds'))/3600;

    //

    let diff2 = hora.diff(horaClick,'seconds')/3600;
    // console.log(diff2);

    if (diff2 > 24) { // si la diferencia entre la hora actual y la ultima vez que se hizo clic es mayor a 24 horas, directamente se borra el contador
      
      localStorage.removeItem('contador');

    }else{

      if (diff >= 24) { // si la diferencia entre la hora actual y mañana es mayor a 24 se empieza a contar desde el día anterior a las 20:00 hasta hoy a las 20:00

        let d = pm8.diff(horaClick,'seconds')/3600;

        if (d > 24) {
          console.log('borrar contador')
          localStorage.removeItem('contador');
        }
        
        console.log('desde el dia anterior', d);
        
      }else{ // en caso contrario se cuenta a partir de hoy a las 20:00 hasta mañana a las 20:00

        let d = pm8p1.diff(horaClick,'seconds')/3600;

        if (d > 24) {
          console.log('borrar contador')
          localStorage.removeItem('contador');
        }

        console.log('hasta el dia siguiente', d);

      }
    }
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
        localStorage.removeItem('ultimos');
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

  scrapping3(){
    this.service.tabla3().subscribe((data: any) => {

      localStorage.setItem('e200', data);

      let json = JSON.parse(data);
      let fechas = [];
      let numeros = [];
      //let meses = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];

      for (let i = 0; i < 200; i++) {

        let obj = json[i]["numeriEstratti"];

        for (let key in obj) {

          numeros.push(obj[key]);

        }

      }

      for (let i = 0; i < 200; i++) {

        let obj = json[i]["progressivo"];
        fechas.push(obj);

      }

      console.log(numeros);
      console.log(fechas);
      localStorage.setItem('e200f', JSON.stringify(fechas));
      localStorage.setItem('e200n', JSON.stringify(numeros));

    });
  }
}