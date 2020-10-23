import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { ComunicacionService } from '../comunicacion.service';

import { ModalSeleccionPage } from '../pages/modal-seleccion/modal-seleccion.page';
import { EventsService } from '../services/events.service';

import * as moment from 'moment';

@Component({
  selector: 'app-combinazione',
  templateUrl: './combinazione.page.html',
  styleUrls: ['./combinazione.page.scss'],
})
export class CombinazionePage implements OnInit {

  excluir: any = [];
  incluir: any = [];
  combinacion: any = [];
  ultimos: any[3] = [];
  fechas: any[3] = [];
  usuario: string = localStorage.getItem('usuario');
  hoy: any;
  format: any;
  contador: number = parseInt(JSON.parse(localStorage.getItem('contador')));
  hour: any;
  minute: any;
  second: any;
  tiempo: any = [];
  colores: any;
  timeout;

  
  intervalo: any;

  meses = ['gennaio',
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

  hh = '17:42';


  constructor(private service: ComunicacionService, public alert: AlertController, public nav: NavController, public modal: ModalController, public events: EventsService) {

    this.events.destroy('doRandom');
    this.events.destroy('doCambio');

    this.events.subscribe('doRandom',()=>{
      this.random();
    });
    this.events.subscribe('doCambio',()=>{
      localStorage.setItem('no-menu-return-back','1');
      this.nav.navigateRoot('selezionis');
    });

    if (!this.contador || this.contador == undefined) {
      this.contador = 0;
    }

    // console.log(this.hoy)

    this.detectDate();

  }

  detectDate()
  {
    let hora = moment();
    let pm8p1 = moment(moment().format('YYYY-MM-DD '+this.hh)).add(1,'day');
    let diff = (pm8p1.diff(hora,'seconds'))/3600;

    if (diff >= 24) { // si la diferencia entre la hora actual y mañana es mayor a 24 se empieza a contar desde el día anterior a las this.hh hasta hoy a las this.hh
      
      console.log('día de hoy');
      this.hoy = moment();
      
    }else{ // en caso contrario se cuenta a partir de hoy a las  +this.hhhasta mañana a las this.hh

      console.log('día siguiente');
      this.hoy = moment().add(1,'day');

    }

    console.log(this.hoy);

    this.format = moment(this.hoy).format('YYYY-MM-DD');
    this.hoy = this.hoy.format('DD') + ' ' + this.meses[ this.hoy.format('M')-1 ] + ' ' + this.hoy.format('YYYY');

    this.preStart();
  }

  ngOnInit() {

    this.preStart();

  }

  preStart() {
    let horaAutomatico = moment(localStorage.getItem('horaAutomatico'));

    this.service.changeData(this.usuario);
    this.reloj();

    if (localStorage.getItem('incluidos') && localStorage.getItem('incluidos') != undefined) {
      
      this.incluir = JSON.parse(localStorage.getItem('incluidos'));

    }else{

      localStorage.setItem('incluidos', JSON.stringify(this.incluir));

    }

    if (localStorage.getItem('excluidos') && localStorage.getItem('excluidos') != undefined) {
      
      this.excluir = JSON.parse(localStorage.getItem('excluidos'));
    
    }else{
      
      localStorage.setItem('excluidos', JSON.stringify(this.excluir));

    }

    if (localStorage.getItem('ufechas') && localStorage.getItem('ufechas') != undefined) {

      this.fechas = JSON.parse(localStorage.getItem('ufechas'));

      if (this.hoy != this.fechas[0].fecha) {

        this.contador = 0;
        this.combinacion = [];

        this.random(true);
      }
      //this.fechas = this.fechas.reverse();
    
    }else{

      this.fechas = [];
      localStorage.setItem('ufechas', JSON.stringify(this.fechas));

    }

    if (localStorage.getItem('combinacion') && localStorage.getItem('combinacion') != undefined) {

      let fechas = JSON.parse(localStorage.getItem('ufechas'));
      
      if (fechas.findIndex(x=>x.fecha==this.hoy) == -1) {
        this.random(true);
      }else{
        this.combinacion = JSON.parse(localStorage.getItem('combinacion'));
      }
    
    }else{
      
      this.random(true);
      localStorage.setItem('combinacion', JSON.stringify(this.combinacion));

    }

    // if (localStorage.getItem('ultimos') && localStorage.getItem('ultimos') != undefined) {

    //   this.ultimos = JSON.parse(localStorage.getItem('ultimos'));
    
    // }else{

    //   this.ultimos = [];
    //   localStorage.setItem('ultimos', JSON.stringify(this.ultimos));

    // }

    setTimeout(()=>{

      if (localStorage.getItem('random')) {
        localStorage.removeItem('random');
        this.random();
      }
      
    },1000)

    this.start();
  }

  start()
  {
    let dias = [];
    let dia = moment(this.format).subtract(0,'day');
    let limit = moment(this.format).subtract(4,'days');
    let fechas = JSON.parse(localStorage.getItem('ufechas'));
    let new_fechas = [];

    while(dia.format('YYYY-MM-DD') != limit.format('YYYY-MM-DD')){
      dias.push(dia.format('YYYY-MM-DD'));
      dia.subtract(1,'day');
    }

    // console.log(dias,this.format);

    for (let i in dias) {
      let idx = this.fechas.findIndex(x=>x.format==dias[i]);
      let actual = [];

      if (idx == -1) {

        console.log('no existe',dias[i]);

        if (this.incluir) {
          for (let h in this.incluir) {
            actual.push(this.incluir[h]);
          }
        }

        for (let n = 0; n < (5 - this.incluir.length); n++) {  
          actual.push( this.getRandomArbitrary(1, 55, actual, this.excluir) );
        }

        actual = actual.sort((a,b)=> a - b);

        // const colores = ['green', 'yellow', 'red'];

        // this.validar(actual);


        // if (this.colores !== colores[0]) {
          
        //   console.log(actual);

        //   return this.start();

        // }

        let d:any = moment(dias[i]);
        let f = d.format('DD') + ' ' + this.meses[ d.format('M')-1 ] + ' ' + d.format('YYYY');
        let temp = {fecha:f,format:dias[i],date: new Date(d).getTime(),combinacion:actual};

        new_fechas.push(temp);

      }else{
        new_fechas.push(fechas[idx]);
      }
    }
 
    // let new_dates = [];

    // for(let i = 0; i < 4; i++) {
    //   new_dates.push(fechas[i]);
    // }

    this.fechas = new_fechas.sort((a,b)=> a - b);

    localStorage.setItem('ufechas',JSON.stringify(this.fechas));

    this.actualizar();
  }

  getRandomArbitrary(min, max, n:any = [], exc:any = []){

    let number = Math.floor(Math.random() * (max - min) + min);
    let a = 0;
    let b = 0;

    for (let i = 0; i < n.length; i++) {
      if (n[i] == number) {
        a++;
      }
    }

    for (let i = 0; i < exc.length; i++) {
      if (exc[i] == number) {
        b++;
      }
    }


    if (a > 0 || b > 0) {

      console.log(a,b);

      return this.getRandomArbitrary(min, max, n, exc);

    }else{

      return number;

    }

  }

  random(automatico = false){

    // if (reverse) {
    //   this.fechas = this.fechas.reverse();
    // }

    // let ultimos = [];
    // if (localStorage.getItem('ultimos')) {
    //   ultimos = JSON.parse(localStorage.getItem('ultimos'));
    // }
    // this.ultimos = this.ultimos.reverse();

    if (this.combinacion.length == 0) {
      
      this.contador = 0;
    
    }else{
      
      this.contador = 1;

    }

    this.combinacion = [];
    let omitir = [];

    if (this.incluir) {
      for (let h in this.incluir) {
        this.combinacion.push(this.incluir[h]);
      }
    }

    for (var i = 0; i < (5 - this.incluir.length); i++) {  
      this.combinacion.push( this.getRandomArbitrary(1, 55, this.combinacion, this.excluir) );
    }

    this.combinacion = this.combinacion.sort((a,b)=> a - b);

    /**/

    const colores = ['green', 'yellow', 'red'];

    this.validar(this.combinacion);


    if (this.colores !== colores[0]) {
      
      console.log(this.combinacion);

      return this.random(false);

    }

    /**/

    // let final = ultimos.length;

    let idx = this.fechas.findIndex(x=>x.fecha==this.hoy && x.combinacion);

    if (idx == -1) {

      // console.log(1)
      // ultimos[idx] = this.combinacion;
      // this.fechas[final - 1] = this.hoy;

    // }else{

      // console.log(2)

      // ultimos.push(this.combinacion);
      let m:any = moment();

      this.fechas.push({fecha:this.hoy,format:this.format,date: new Date( m ).getTime(),combinacion:this.combinacion});

    }else{
      this.fechas[idx].combinacion = this.combinacion;
    }

    // if (this.contador == 1) {

    //   console.log(1)
    //   ultimos[final - 1] = this.combinacion;
    //   this.fechas[final - 1] = this.hoy;

    // }else{

    //   console.log(2)

    //   ultimos.push(this.combinacion);
    //   this.fechas.push(this.hoy);

    // }


    this.fechas = this.fechas.sort((a,b)=> b.date - a.date);

    // console.log('fechas',this.fechas);

    // if (ultimos.length == 5 && this.fechas.length == 5) {

    //   this.fechas.shift();
    //   ultimos.shift();

    // }

    if (this.fechas.length == 5) {

      this.fechas.shift();
      // ultimos.shift();

    }

    // localStorage.setItem('ultimos', JSON.stringify(ultimos));
    localStorage.setItem('ufechas', JSON.stringify(this.fechas));
    localStorage.setItem('combinacion', JSON.stringify(this.combinacion));

    if (automatico) {

      localStorage.removeItem('horaClick');
      localStorage.removeItem('contador');
      localStorage.setItem('horaAutomatico', moment().format('YYYY-MM-DD HH:mm:ss'));

    }else{

      localStorage.setItem('contador', JSON.stringify(this.contador));
      localStorage.setItem('horaClick', moment().format('YYYY-MM-DD HH:mm:ss'));
      
    }

    if (this.fechas.length > 1) {
      this.actualizar();
    }

    // this.ultimos = ultimos;

  }

  reloj(){

    let mostrar_hora = () => {

      let mins8 = moment(moment().format('YYYY-MM-DD '+this.hh));
      let now;

      let restante = mins8.diff(moment(),'seconds');

      if (restante <= 0) {

        now = moment(moment(new Date()).add(1,'days').format('YYYY-MM-DD '+this.hh));

      }else{

        now = moment(moment().format('YYYY-MM-DD '+this.hh));

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

      // console.log(seconds);

      // if (this.hour == 0 && this.minute == 0 && this.second == 0) {
      if (seconds == 86400) {

        this.combinacion = [];

        localStorage.setItem('combinacion', JSON.stringify(this.combinacion));
        
        // this.random(true);
        setTimeout(()=>{
          this.detectDate();
        },3000)
        console.log('rein');
        //clearInterval(this.intervalo);

      }

    }

    this.intervalo = null;
    this.intervalo = setInterval(mostrar_hora, 1000);

  }

  async modifica()
  {
    const modal = await this.modal.create({
      component: ModalSeleccionPage,
      cssClass: 'selection-modal'
    });
    return await modal.present();

    // this.alert.create({header:'Modifica combinazione',message:'Vuoi cambiare le regole?', buttons: [
    // {
    //   text:"Con il sistema attuale",
    //   handler: ()=> {
    //     this.random();
    //   }
    // },{
    //   text:"Con nuove impostazioni del sistema",
    //   handler: ()=> {
    //     localStorage.setItem('no-menu-return-back','1');
    //     this.nav.navigateRoot('selezionis');
    //   }
    // }
    // ]}).then(a=>a.present())
  }

  validar(comb){

    // clearTimeout(this.timeout);
    
    // this.timeout = setTimeout(()=>{
    //   this.colores = null;
    // },5000)

    // console.log(this.combinacion);
    const combinazione = comb.sort((a, b) => a - b);
    const semaforo = document.getElementById("rvalidacion");
    const colores = ['green', 'yellow', 'red'];
    const primos = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
    let nprimos = 0;

    // console.log('validar',combinazione);

    // pares

    let comp = 0;

    for (var i = 0; i < combinazione.length; i++) {
      if (combinazione[i]%2 == 0) {
        comp++;
      }
    }

    if (comp==5) {
      console.log('TODOS SON PARES, Naranja');
      return this.colores = colores[1];
    }

    comp = 0;

    for (var i = 0; i < combinazione.length; i++) {
      if (combinazione[i]%2 == 1) {
        comp++;
      }
    }

    if (comp==5) {
      console.log('TODOS SON IMPARES, Naranja');
      return this.colores = colores[1];
    }


    // impares


    let seguidos = 0;
    let coincidencias = [];
    let u200 = JSON.parse(localStorage.getItem('e200n'));

    let combinacion = [];
    for (let h in combinazione) {
      combinacion.push(combinazione[h].toString());
    }

    for (let h in u200) {
      if (JSON.stringify(combinacion) == JSON.stringify(u200[h])) {
        return this.colores = colores[1];
      }
    }

    for (let i = 0; i < combinazione.length; i++) {

      if (combinazione[i+1] !== undefined) {

        if (combinazione[i]+1 == combinazione[i+1]) {
          seguidos++;
        }
      }
    }

    //console.log(seguidos);


    for (let i = 0; i <= combinazione.length; i++) {

      let numero = combinazione[i];

      for (let x = 0; x < primos.length; x++) {

        let primo = primos[x];

        if (numero == primo) {
          nprimos++;
        }
      }
    }

    // console.log(nprimos);

    if (nprimos == 5 || seguidos == 3) {
      return this.colores = colores[2];
    }

    if (nprimos == 4 || seguidos == 2) {
      return this.colores = colores[1];
    }

    // regla 1
    let a = 0;
    
    for (let h = 1; h <= 13; h++) {
      
      a = 0;
      
      for (let i = 0; i < combinazione.length; i++) {

        if (combinazione[i+1] !== undefined) {

          if (combinazione[i]+h == combinazione[i + 1]) {

            a++;

          }
        }
      }

      //console.log(h, a);
      
      if (a >= 3) {
        return this.colores = colores[2];
      }else if(a >= 2){
        if (seguidos > 0) {
          return this.colores = colores[2];
        }
      }
      
    }

    return this.colores = colores[0];

  }

  actualizar()
  {
     let correo = {

      correo: localStorage.getItem('correo'),
      combinaciones: JSON.stringify(this.fechas),
      incluidos: localStorage.getItem('incluidos'),
      excluidos: localStorage.getItem('excluidos'),
      reglas: localStorage.getItem('checks')

    };

    console.log(correo,"correo");

    this.service.actualizar_combinaciones(correo).subscribe((data:any) => {

      console.log('Datos actualizados');

    }, Error => {

      console.log(Error);

    });
  }

}
