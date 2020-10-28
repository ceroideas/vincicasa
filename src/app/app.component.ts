import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ComunicacionService } from './comunicacion.service';
import * as moment from 'moment';
import { MenuController, AlertController } from '@ionic/angular';
import { Numeros } from './numeros';
// import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { CambioPage } from './recuperar/cambio/cambio.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  user: any;
  hour: any;
  minute: any;
  second: any;
  tiempo: any = [];
  numeros = new Numeros();

  hh = this.service.hSorteo;

  constructor(private localNotifications: LocalNotifications, public nav: NavController, private service: ComunicacionService, public menuCtrl: MenuController,
    public alertController: AlertController/*, private deeplinks: Deeplinks*/,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
    ) { 

    this.menuCtrl.toggle(); 

    this.initializeApp();

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

  simpleNotif() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Benvenuto a Millionday!!',
      data: { secret: 'secret' }
    });
  }

  logout() {

    localStorage.removeItem('usuario');
    localStorage.removeItem('correo');
    localStorage.removeItem('excluidos');
    localStorage.removeItem('incluidos');
    localStorage.removeItem('ufechas');

    this.nav.navigateRoot('home');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.show();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });

    this.simpleNotif();

    // this.localNotifications.requestPermission().then(
    //   (permission) => {
    //     if (permission) {
    //       // Create the notification
    //       console.log('diste permisos')

    //     }
    //   }
    // );
  }

  ngOnInit(){

    this.reloj();
    this.service.data$.subscribe(res => {this.user = res; /*console.log(typeof res)*/});
    this.scrapping3();

    let horaClick = moment(localStorage.getItem('horaClick'));
    let hora = moment();
    let pm8 = moment(moment().format('YYYY-MM-DD ' + this.hh));
    let pm8p1 = moment(moment().format('YYYY-MM-DD ' + this.hh)).add(1,'day');
    let diff = (pm8p1.diff(hora,'seconds'))/3600;
    let diff2 = hora.diff(horaClick,'seconds')/3600;

    if (diff2 > 24) { // si la diferencia entre la hora actual y la ultima vez que se hizo clic es mayor a 24 horas, directamente se borra el contador
      
      localStorage.removeItem('contador');

    }else{

      if (diff >= 24) { // si la diferencia entre la hora actual y mañana es mayor a 24 se empieza a contar desde el día anterior a las this.hh hasta hoy a las this.hh
        let d = pm8.diff(horaClick,'seconds')/3600;

        if (d > 24) {
          // console.log('borrar contador')
          localStorage.removeItem('contador');
        }else{
          // localStorage.setItem('contador','1');
        }
        
        // console.log('desde el dia anterior', d);
        
      }else{ // en caso contrario se cuenta a partir de hoy a las  +this.hhhasta mañana a las this.hh
        let d = pm8p1.diff(horaClick,'seconds')/3600;

        if (d > 24) {
          // console.log('borrar contador')
          localStorage.removeItem('contador');
        }else{
          // localStorage.setItem('contador','1');
        }

        // console.log('hasta el dia siguiente', d);

      }
    }

    let lastNotification = moment(localStorage.getItem('last-notification'));
    hora = moment();
    pm8 = moment(moment().format('YYYY-MM-DD ' + this.hh));
    pm8p1 = moment(moment().format('YYYY-MM-DD ' + this.hh)).add(1, 'day');
    diff = (pm8p1.diff(hora, 'seconds'))/3600;
    diff2 = hora.diff(lastNotification,'seconds')/3600;

    console.log(diff);

    if (diff2 > 24 || !diff2) { // si la diferencia entre la hora actual y la ultima vez que se hizo clic es mayor a 24 horas, directamente llamo la notificacion
      
      console.log('enviar notificacion directamente')
      this.verGanadores();

    }else{

      if (diff >= 24) { // si la diferencia entre la hora actual y mañana es mayor a 24 se empieza a contar desde el día anterior a las this.hh hasta hoy a las this.hh
        let d = pm8.diff(lastNotification,'seconds')/3600;

        if (d > 24) {
          console.log('enviar notificacion 1')
          this.verGanadores();
        }else{
          // localStorage.setItem('contador','1');
        }
        
      }else{ // en caso contrario se cuenta a partir de hoy a las this.hh hasta mañana a las this.hh
        let d = pm8p1.diff(lastNotification,'seconds')/3600;

        if (d > 24) {
          console.log('enviar notificacion 2')
          this.verGanadores();
        }else{
          // localStorage.setItem('contador','1');
        }

      }
    }
  }

  reloj(){

    let mostrar_hora = () => {

      let mins8 = moment(moment().format('YYYY-MM-DD ' + this.hh));
      let now;

      let restante = mins8.diff(moment(),'seconds');

      if (restante <= 0) {

        now = moment(moment(new Date()).add(1,'days').format('YYYY-MM-DD ' + this.hh));

      }else{

        now = moment(moment().format('YYYY-MM-DD ' + this.hh));

      }
      
      let seconds = now.diff(moment(),'seconds');

      // console.log(seconds);

      this.hour = Math.floor(Math.abs(seconds) / 3600);

      this.hour = (this.hour < 10)? '0' + this.hour : this.hour;

      this.minute = Math.floor((Math.abs(seconds) / 60) % 60);

      this.minute = (this.minute < 10)? '0' + this.minute : this.minute;

      this.second = Math.abs(seconds) % 60;

      this.second = (this.second < 10)? '0' + this.second : this.second;

      this.tiempo = [this.hour, this.minute, this.second];

      this.service.reloj(this.tiempo);

      if (seconds == 86400) {

        console.log('El sorteo ha finalizado');
        
        this.scrapping3();
        this.verGanadores();
        
        clearInterval(intervalo);

        this.reloj();

      }

    }

    let intervalo = setInterval(mostrar_hora, 1000);

  }

  verGanadores()
  {
    let jugadas = JSON.parse(localStorage.getItem('ufechas'));
    if (jugadas) {

      let meses = ['gennaio',
      'febbraio',
      'marzo',
      'aprile',
      'maggio',
      'giugno',
      'luglio',
      'agosto',
      'settembre',
      'ottobre',
      'novembre',
      'dicembre'];
    // }
    // if (localStorage.getItem('combinacion')) {
      let hoy:any;
      let hora = moment();
      let pm8p1 = moment(moment().format('YYYY-MM-DD ' + this.hh)).add(1,'day');
      let diff = (pm8p1.diff(hora,'seconds'))/3600;

      if (diff >= 24) { // si la diferencia entre la hora actual y mañana es mayor a 24 se empieza a contar desde el día anterior a las this.hh hasta hoy a las this.hh
        
        hoy = moment();
        console.log('día de hoy',hoy);
        
      }else{ // en caso contrario se cuenta a partir de hoy a las  +this.hhhasta mañana a las this.hh

        hoy = moment().add(1,'day');
        console.log('día siguiente',hoy);

      }

      console.log(hoy);

      hoy = hoy.format('DD') + ' ' + meses[ hoy.format('M')-1 ] + ' ' + hoy.format('YYYY');

      let jugada = jugadas.find(x => x.fecha == hoy);

      if (!jugada) {

        return false;

      }else{

        jugada = jugada.combinacion;

      }

      let ganador = JSON.parse(localStorage.getItem('e200n'))[0];
      let puntos = 0;

      for (let i = 0; i < ganador.length; i++) {

        for (let x = 0; x < ganador.length; x++) {

          if (jugada[i] == ganador[x]) {

            puntos++;

          }

        }

      }

      console.log("puntos: ", puntos);

      this.sorteo(puntos);

      if (puntos >= 0) {

        this.numeros.correo = localStorage.getItem('correo'),
        this.numeros.numero = jugada,
        this.numeros.puntos = puntos.toString();
        this.numeros.usuario = JSON.parse(localStorage.getItem('usuario')).nombre;

        //};

        console.log(this.numeros);

        this.service.ganador(this.numeros).subscribe((data:any)=>{

        }, Error => {

          this.verGanadores();
          console.log(Error);
          //this.alerta(Error);

        });

      }

    }

  }

  sorteo(puntos){

    localStorage.setItem('last-notification', moment().format('YYYY-MM-DD HH:mm'));

    this.numeros.numero = localStorage.getItem('combinacion'),
    this.numeros.correo = localStorage.getItem('correo'),
    this.numeros.puntos = puntos.toString();
    this.numeros.fecha = moment();

    this.service.number(this.numeros).subscribe((data:any) => {

      console.log('Datos enviados');

      let mess = "";

      if (parseInt(puntos) == 0 || parseInt(puntos) == 1) {mess = "Il concorso è finito, non hai fortuna";}

      if (parseInt(puntos) == 2) {mess = "Complimenti! hai vinto";}
      if (parseInt(puntos) == 3) {mess = "COMPLIMENTI! Ricordati di ritirare la tua vincita e se vuoi puoi festeggiare con noi";}
      if (parseInt(puntos) == 4) {mess = "COMPLIMENTI! Guarda i termini per il ritiro della vincita e se vuoi puoi festeggiare con noi";}
      if (parseInt(puntos) == 5) {mess = "COMPLIMENTI! Guarda i termini per il ritiro della vincita e se vuoi puoi festeggiare con noi";}

      this.localNotifications.schedule({
        id: 1,
        text: 'Hai raggiunto ' + puntos + ' punti! '+ mess,
        // sound: ''/*isAndroid? 'file://sound.mp3': 'file://beep.caf'*/,
        data: {secret: ''}//{ secret: key }
      });

    }, Error => {

        console.log(Error);

        return this.sorteo(puntos);
        
        //this.error(Error);

    });

  }

  scrapping3(){

    this.service.tabla3().subscribe((data: any) => {

      console.log(data);

        localStorage.setItem('e200', data[0]);
        localStorage.setItem('fnumeros', data[1]);
        localStorage.setItem('ifnumeros', data[2]);

        let json = JSON.parse(data[0]);
        let json2 = JSON.parse(data[1]);
        let json3 = JSON.parse(data[2]);
        let fechas = [];
        let numeros = [];
        let arrayn = [];
        let frecuentes = [];
        let frecuencia = [];
        let infrecuentes = [];
        let infrecuencia = [];
        let ganadores = [];

        for (let i = 0; i < 4; i++) {

          if (JSON.parse(data[3]).dettaglioConcorso.dettaglioVincite.vincite[i]) {

            ganadores.push(JSON.parse(data[3]).dettaglioConcorso.dettaglioVincite.vincite[i]);

          }
    
        }

        for (let i = 0; i < 200; i++) {

          let obj = json[i]["numeriEstratti"];
          numeros.push(obj);

        }

        for (let i = 0; i < 200; i++) {

          let obj = moment(new Date(json[i]["data"])).format('YYYYMMDD');

          fechas.push(obj);

          //console.log(obj);

        }

        for (let i = 0; i < 10; i++) {

          let obj = json2["frequenti"][i]["numero"];

          frecuentes.push(obj);

        }

        for (let i = 0; i < 10; i++) {

          let obj2 = json2["frequenti"][i]["frequenza"];

          frecuencia.push(obj2);

        }

        for (let i = 0; i < 10; i++) {

          let obj = json3["ritardatari"][i]["numero"];

          infrecuentes.push(obj);

        }

        for (let i = 0; i < 10; i++) {

          let obj2 = json3["ritardatari"][i]["ritardo"];

          infrecuencia.push(obj2);

        }

        localStorage.setItem('e200f', JSON.stringify(fechas));
        localStorage.setItem('e200n', JSON.stringify(numeros));
        localStorage.setItem('frecuentes', JSON.stringify(frecuentes));
        localStorage.setItem('frecuencia', JSON.stringify(frecuencia));
        localStorage.setItem('infrecuentes', JSON.stringify(infrecuentes));
        localStorage.setItem('infrecuencia', JSON.stringify(infrecuencia));
        localStorage.setItem('ganadores', JSON.stringify(ganadores));
        this.scrapping();

    }, Error => {

      this.scrapping3();
      
    });

  }

  scrapping(){
    let dias = [];
    let fechas = [];
    let numeros = [];
    let ultimos = [];
    let data = JSON.parse(localStorage.getItem('e200f'));
    let data2 = JSON.parse(localStorage.getItem('e200n'));
    let meses = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];
    let days = ["DOMENICA", "SABATO", "VENERDÌ", "GIOVEDÌ", "MERCOLEDÌ", "MARTEDÌ", "LUNEDÌ"];
  
    for (let i = 0; i <= 7; i++) {
      dias.push(data[i]);
      numeros.push(data2[i]);
    }

    localStorage.setItem('dias', JSON.stringify(dias));
    localStorage.setItem('numeros', JSON.stringify(numeros));

    for (let i = 0; i < 7; i++) {

      let mes =  moment().subtract(i, 'd').format('M');
      fechas[i] = moment().subtract(i, 'd').format('DD') + ' ' + meses[parseInt(mes)-1] + ' ' + moment().subtract(i, 'd').format('Y');
      fechas[i] = fechas[i].replace(data, meses[i]);

    }

    localStorage.setItem('fechas', JSON.stringify(fechas));

  }

}
