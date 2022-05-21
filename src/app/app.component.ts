import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ComunicacionService } from './comunicacion.service';
import { EventsService } from './services/events.service';
import * as moment from 'moment';
import { MenuController, AlertController } from '@ionic/angular';
import { Numeros } from './numeros';
// import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { CambioPage } from './recuperar/cambio/cambio.page';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { Subscription } from 'rxjs';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [AdMobFree, InAppBrowser]
})
export class AppComponent {

  user: any;
  hour: any;
  minute: any;
  second: any;
  tiempo: any = [];
  numeros = new Numeros();

  hh = this.service.hSorteo;

  private onResumeSubscription: Subscription;

  ngOnDestroy() {
    this.onResumeSubscription.unsubscribe();
  }

  constructor(/*private localNotifications: LocalNotifications,*/private oneSignal: OneSignal, public nav: NavController, private service: ComunicacionService, public menuCtrl: MenuController,
    public alertController: AlertController/*, private deeplinks: Deeplinks*/, private iab: InAppBrowser,
    private platform: Platform,
    private splashScreen: SplashScreen,
    public events: EventsService,
    private statusBar: StatusBar,
    private admobFree: AdMobFree
    ) { 

    this.menuCtrl.toggle(); 

    this.initializeApp();
  }

  // pp()
  // {
  //   // const browser = this.iab.create('https://paypal.me/milliondayvincicasa?locale.x=it_IT');
  //   window.open('https://paypal.me/milliondayvincicasa?locale.x=it_IT','_blank');
  // }

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
      header: 'Avviso:',
      subHeader: '',
      message: alerta,
      buttons: ['OK']
    });

    await alert.present();
  }

  simpleNotif() {
    // this.localNotifications.schedule({
    //   id: 1,
    //   text: 'Benvenuto a VINCICASA!!',
    //   data: { secret: 'secret' }
    // });
  }

  logout() {

    localStorage.removeItem('usuario');
    localStorage.removeItem('correo');
    localStorage.removeItem('excluidos');
    localStorage.removeItem('incluidos');
    localStorage.removeItem('ufechas');
    localStorage.removeItem('horaClick');
    localStorage.removeItem('last-notification');

    this.admobFree.banner.hide();

    this.nav.navigateRoot('home');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.show();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();

      this.initializeOnesignal();
      let b_id:string;

      if(this.platform.is('ios')){ 
          b_id = "ca-app-pub-5570278331170402/1530710534";
      }else{
          b_id = "ca-app-pub-5570278331170402/4937626592";
      }

      const bannerConfig: AdMobFreeBannerConfig = {
        id:b_id,
       // add your config here
       // for the sake of this example we will just use the test config
       isTesting: false,
       autoShow: false
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare()
        .then(() => {
          console.log('showing banner')
          if (localStorage.getItem('correo')) {
            this.admobFree.banner.show();
          }
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log('error banner',e));
    });


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

    this.service.data$.subscribe(res => {this.user = res; /*console.log(typeof res)*/});

    this.onResumeSubscription = this.platform.resume.subscribe(() => {
      this.programarNotificaciones();
    });

    this.events.destroy('programarNotificaciones');
    this.events.subscribe('programarNotificaciones',()=>{
      this.programarNotificaciones();
      this.admobFree.banner.show();
    })

    if (localStorage.getItem('correo')) {
      setTimeout(()=>{
        this.programarNotificaciones();
      },500)
    }
  }
  
  programarNotificaciones()
  {
    this.reloj();

    let horaClick = moment(localStorage.getItem('horaClick'));
    let hora = moment();
    let pm8 = moment(moment().format('YYYY-MM-DD ' + this.hh));
    let pm8p1 = moment(moment().format('YYYY-MM-DD ' + this.hh)).add(1,'day');
    let diff = hora.diff(horaClick,'seconds')/3600;
    let diff2 = (pm8p1.diff(hora,'seconds'))/3600;

    if (diff > 24) { // si la diferencia entre la hora actual y la ultima vez que se hizo clic es mayor a 24 horas, directamente se borra el contador
      
      localStorage.removeItem('contador');
      this.events.publish('removeContador');

    }else{

      if (diff2 >= 24) { // si la diferencia entre la hora actual y mañana es mayor a 24 se empieza a contar desde el día anterior a las this.hh hasta hoy a las this.hh
        let d = pm8.diff(horaClick,'seconds')/3600;

        if (d > 24) {
          // console.log('borrar contador')
          localStorage.removeItem('contador');
          this.events.publish('removeContador');
        }else{
          // localStorage.setItem('contador','1');
        }
        
        // console.log('desde el dia anterior', d);
        
      }else{ // en caso contrario se cuenta a partir de hoy a las  +this.hhhasta mañana a las this.hh
        let d = pm8p1.diff(horaClick,'seconds')/3600;

        if (d > 24) {
          // console.log('borrar contador')
          localStorage.removeItem('contador');
          this.events.publish('removeContador');
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
    diff = hora.diff(lastNotification,'seconds')/3600;
    diff2 = (pm8p1.diff(hora, 'seconds'))/3600;

    let verGanadores = false;

    console.log(diff);

    let date;

    if (diff > 24 || !diff) { // si la diferencia entre la hora actual y la ultima vez que se hizo clic es mayor a 24 horas, directamente llamo la notificacion
      
      console.log('enviar notificacion directamente')
      verGanadores = true;

      if (diff2 >= 24) {
        date = moment(moment().format('YYYY-MM-DD ' + this.hh)).format();
      }else{
        date = moment(moment().format('YYYY-MM-DD ' + this.hh)).add(1,'day').format();
      }

      this.notificar(date);

    }else{

      if (diff2 >= 24) { // si la diferencia entre la hora actual y mañana es mayor a 24 se empieza a contar desde el día anterior a las this.hh hasta hoy a las this.hh
        console.log('enviar notificacion 1')

        let d = pm8.diff(lastNotification,'seconds')/3600;

        if (d >= 24) {
          verGanadores = true;
          
          date = moment(moment().format('YYYY-MM-DD ' + this.hh)).format();
          this.notificar(date);
        }

        
      }else{ // en caso contrario se cuenta a partir de hoy a las this.hh hasta mañana a las this.hh
        console.log('enviar notificacion 2')

        let d = pm8p1.diff(lastNotification,'seconds')/3600;

        if (d >= 24) {
          verGanadores = true;
          
          date = moment(moment().format('YYYY-MM-DD ' + this.hh)).add(1,'day').format();
          this.notificar(date);

        }


      }
    }

    this.scrapping3(verGanadores);
  }

  /**/

  notificar(date)
  {
    console.log('scheduled notification',date);

    let correo = localStorage.getItem('correo');

    let json = {
      correo: correo,
      referencia: Math.floor(Math.random()*2),
      hora: date
    }

    this.service.notificaciones_push(json).subscribe((data) => {

      console.log(data);

    }, Error => {

      return this.notificar(date);

    });
  }

  /**/

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
        
        // this.scrapping3();
        this.programarNotificaciones();
        // this.verGanadores();
        
        clearInterval(intervalo);

        // this.reloj();

      }

    }

    let intervalo = setInterval(mostrar_hora, 1000);

  }

  verGanadores()
  {
    let jugadas;
    if (localStorage.getItem('ufechas')) {
      jugadas = JSON.parse(localStorage.getItem('ufechas'));
    }

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

      let hoy:any;
      let hora = moment();
      let pm8p1 = moment(moment().format('YYYY-MM-DD ' + this.hh)).add(1,'day');
      let diff = (pm8p1.diff(hora,'seconds'))/3600;
      let saveHour;

      if (diff >= 24) { // si la diferencia entre la hora actual y mañana es mayor a 24 se empieza a contar desde el día anterior a las this.hh hasta hoy a las this.hh
        
        hoy = moment().subtract(1,'day');
        saveHour = moment().subtract(1,'day');
        console.log('día de hoy',hoy);
        
      }else{ // en caso contrario se cuenta a partir de hoy a las  +this.hhhasta mañana a las this.hh

        hoy = moment()/*.add(1,'day')*/;
        saveHour = moment();
        console.log('día siguiente',hoy);

      }

      console.log(hoy);

      let format = hoy.format('YYYYMMDD');
      hoy = hoy.format('DD') + ' ' + meses[ hoy.format('M')-1 ] + ' ' + hoy.format('YYYY');

      let jugada = jugadas.find(x => x.fecha == hoy);

      if (!jugada) {

        console.log('nojugada',jugadas);

        return false;

      }else{

        jugada = jugada.combinacion;

      }

      let index = JSON.parse(localStorage.getItem('e200f')).findIndex(x=>x == format);
      let puntos = 0;

      if (index == -1) {
        return false;
      }

      let ganador = JSON.parse(localStorage.getItem('e200n'))[index];

      for (let i = 0; i < ganador.length; i++) {

        for (let x = 0; x < ganador.length; x++) {

          if (jugada[i] == ganador[x]) {

            puntos++;

          }

        }

      }

      console.log("puntos: ", puntos);

      this.numeros.numero = JSON.stringify(jugada),

      this.sorteo(puntos,saveHour);

      if (puntos >= 2) {

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

  sorteo(puntos, hour){

    localStorage.setItem('last-notification', moment().format('YYYY-MM-DD HH:mm'));

    this.numeros.correo = localStorage.getItem('correo'),
    this.numeros.puntos = puntos.toString();
    this.numeros.fecha = hour;

    this.service.number(this.numeros).subscribe((data:any) => {

      console.log('Datos enviados');

      // let mess = "";

      // if (parseInt(puntos) == 0 || parseInt(puntos) == 1) {mess = "Il concorso è finito, non hai fortuna";}

      // if (parseInt(puntos) == 2) {mess = "Complimenti! hai vinto";}
      // if (parseInt(puntos) == 3) {mess = "COMPLIMENTI! Ricordati di ritirare la tua vincita e se vuoi puoi festeggiare con noi";}
      // if (parseInt(puntos) == 4) {mess = "COMPLIMENTI! Guarda i termini per il ritiro della vincita e se vuoi puoi festeggiare con noi";}
      // if (parseInt(puntos) == 5) {mess = "COMPLIMENTI! Guarda i termini per il ritiro della vincita e se vuoi puoi festeggiare con noi";}

      // this.localNotifications.schedule({
      //   id: 1,
      //   text: 'Hai raggiunto ' + puntos + ' punti! '+ mess,
      //   // sound: ''/*isAndroid? 'file://sound.mp3': 'file://beep.caf'*/,
      //   data: {secret: ''}//{ secret: key }
      // });

    }, Error => {

        console.log(Error);

        return this.sorteo(puntos, hour);
        
        //this.error(Error);

    });

  }

  scrapping3(verGanadores = false){

    this.service.tabla3().subscribe((data: any) => {

      console.log(data);

       /* localStorage.setItem('e200', data[0]);
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
        localStorage.setItem('ganadores', JSON.stringify(ganadores));*/

        for (let i = 1; i >= 7; i++) {

          localStorage.setItem('e200' + i, data[i]);
          
        }
        
        let json = [];

        for (let i = 0; i < data.length - 1; i++) {

          json[i] = JSON.parse(data[i]);

        }
  
        let ganadores = [];
        let fechas = [];
        let numeros = [];
        let arrayn = [];
        let frecuentes = [];
        let frecuencia = [];
        let infrecuentes = [];
        let infrecuencia = [];
        let ganador;

        //console.log(data[8]);

        if (JSON.parse(data[8]).dettaglioConcorso.combinazioneVincente.estratti) {
          ganador = JSON.parse(data[8]).dettaglioConcorso.combinazioneVincente; 
        }

        for (let x = 0; x < json.length; x++) {

          if (json[x].concorsi) {

            for (let i = json[x].concorsi.length-1; i >= 0; i--) {

              if (json[x].concorsi[i].combinazioneVincente) {

                let obj = json[x].concorsi[i].combinazioneVincente["estratti"];
                numeros.push(obj); 

              } 

            }

          }

        }

        for (let x = 0; x < json.length; x++) {

          if (json[x].concorsi) {

            for (let i = json[x].concorsi.length-1; i >= 0; i--) {

              if (json[x].concorsi[i].combinazioneVincente) {

                let dato2 = json[x]["concorsi"][i].dataEstrazione;

                // let fechasc = moment().subtract(i, 'd').format('MM');
                // let fechasc2 = moment().subtract(i, 'd').format('DD');
                // let obj = dato2 + fechasc + fechasc2;
                let obj = moment(dato2).format('YYYYMMDD');

                fechas.push(obj); 

              }

            }

          }

        }

        for (let i = 0; i < 4; i++) {

          if (JSON.parse(data[8]).dettaglioConcorso.dettaglioVincite.vincite[i]) {

            ganadores.push(JSON.parse(data[8]).dettaglioConcorso.dettaglioVincite.vincite[i]);

          }
    
        }

        /*for (let i = 0; i < 10; i++) {

          let obj = json["frequenti"][i]["numero"];

          frecuentes.push(obj);

        }

        for (let i = 0; i < 10; i++) {

          let obj2 = json["frequenti"][i]["frequenza"];

          frecuencia.push(obj2);

        }

        for (let i = 0; i < 10; i++) {

          let obj = json["ritardatari"][i]["numero"];

          infrecuentes.push(obj);

        }

        for (let i = 0; i < 10; i++) {

          let obj2 = json["ritardatari"][i]["ritardo"];

          infrecuencia.push(obj2);

        }*/

        localStorage.setItem('ganador', JSON.stringify(ganador));
        localStorage.setItem('ganadores', JSON.stringify(ganadores));
        localStorage.setItem('e200f', JSON.stringify(fechas));
        localStorage.setItem('e200n', JSON.stringify(numeros));
         /*localStorage.setItem('frecuentes', JSON.stringify(frecuentes));
        localStorage.setItem('frecuencia', JSON.stringify(frecuencia));
       localStorage.setItem('infrecuentes', JSON.stringify(infrecuentes));
        localStorage.setItem('infrecuencia', JSON.stringify(infrecuencia));*/

        this.scrapping();

        if (verGanadores) {
          setTimeout(()=>{
            this.verGanadores();
          }, 5000)
        }

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
  
    for (let i = 0; i < 7; i++) {
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

  initializeOnesignal()
  {
    this.oneSignal.startInit('79f6631f-0337-468b-a5cb-d35103502773', '175206108562');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received saveOneSignalId
    });

    this.oneSignal.handleNotificationOpened().subscribe((jsondata) => {
      // do something when a notification is opened
      if (jsondata.notification.payload.additionalData.type == 'url') {
        this.iab.create(jsondata.notification.payload.additionalData.url);
      }
    });

    this.oneSignal.endInit();

    this.oneSignal.getIds().then((ids)=> {
      localStorage.setItem('onesignal_id',ids.userId);

      if (localStorage.getItem('correo')) {
        let correo = localStorage.getItem('correo');
        let onesignal_id = localStorage.getItem('onesignal_id');

        this.service.saveOneSignalId({correo:correo,onesignal_id:onesignal_id})
        .subscribe(
          data => {console.log('ok');},
          err => {console.log(err);}
        );
      }

    });
  }

  async disableAcc() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Avviso:',
      // subHeader: '',
      message: 'Sei sicuro di voler cancellare il tuo account?',
      buttons: [
      {text:'Si', handler:()=>{
        this.service.disableAcc(localStorage.getItem('correo')).subscribe(data=>{
          this.alerta('Il tuo account è stato cancellato');
          this.logout();
        })
      }},{
        text:'No'
      }]
    });

    await alert.present();
  }

}
