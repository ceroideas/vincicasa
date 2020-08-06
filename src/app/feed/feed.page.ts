import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComunicacionService } from '../comunicacion.service';
import { Numeros } from '../numeros';
import { Router } from  '@angular/router';
import { MenuController } from  '@ionic/angular';
import * as moment from 'moment';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  /*data = new Numeros();
  n1: string = localStorage.getItem('excluir');
  exc1: number = +this.n1;
  n2: string = localStorage.getItem('excluir2');
  exc2: number = +this.n2;
  n3: string = localStorage.getItem('incluir');
  inc1: number = +this.n3;
  n4: string = localStorage.getItem('incluir2');
  inc2: number = +this.n4;
  resultado: any = [];
  colores: string;*/
  usuario: string = localStorage.getItem('correo');
  horas: any = [];
 // @Output() cambio = new EventEmitter();

  constructor(private menu: MenuController, private comunicacion: ComunicacionService, private router: Router) {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.comunicacion.changeData(this.usuario);
    // this.refrescar();
    this.reloj();
   // this.cambio.emit(this.usuario);
   /* console.log(this.usuario);
    this.reloj();
    
    
    if (localStorage.getItem('numeros') == '' || localStorage.getItem('numeros') == undefined) {
      this.scrapping();*/
    }

  refrescar(){
    let mostrar_hora = () => {

      this.horas = [];
      this.comunicacion.hora$.subscribe(res => {

        let verificar = document.getElementById("hh1");

        if (verificar) {

          verificar.innerHTML = res[0];
          document.getElementById("mh1").innerHTML = res[1];
          document.getElementById("sh1").innerHTML = res[2];
          
        }else{
          clearInterval(intervalo);
        }

      });
    }
    let intervalo = setInterval(mostrar_hora, 1000);
  }
  /*getRandomArbitrary(min, max){
    return Math.random() * (max - min) + min;
  }*/

  /*validar(event, array = this.resultado){

    const semaforo = document.getElementById("rvalidacion");
    const colores = ['Combinación probable: Verde', 'Combinación poco probable: Amarillo', 'Combinación difícilmente probable: Rojo'];

    if (semaforo.style.display = 'none') {
      semaforo.style.display = 'block';
    }

    if (array[1] == array[0] + 1 && array[2] == array[1] + 1 || array[2] == array[1] + 1 && array[3] == array[2] + 1 || array[3] == array[2] + 1 && array[4] == array[3] + 1) {
      
      this.colores = colores[1];

    }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[3] == array[2] + 1  || array[2] == array[1] + 1 && array[3] == array[2] + 1 && array[4] == array[3] + 1) {
      
      this.colores = colores[1];

    }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[4] == array[3] + 1 || array[4] == array[3] + 1 && array[3] == array[2] + 1 && array[1] == array[0] + 1) {

      this.colores = colores[2];

    }else if (array[1] == array[0] + 1 && array[2] == array[1] + 1 && array[3] == array[2] + 1 || array[4] == array[3] + 1 && array[3] == array[2] + 1 && array[2] == array[1] + 1) {
            
      this.colores = colores[2];

    }else if (array[1] == array[0] + 2 && array[2] == array[1] + 2 && array[3] == array[2] + 2 || array[4] == array[3] + 2 && array[3] == array[2] + 2 && array[2] == array[1] + 2) {
            
      this.colores = colores[2];

    }else if (array[1] == array[0] + 3 && array[2] == array[1] + 3 || array[4] == array[3] + 3 && array[3] == array[2] + 3) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 4 && array[2] == array[1] + 4 && array[3] == array[2] + 4 || array[4] == array[3] + 4 && array[3] == array[2] + 4 && array[2] == array[1] + 4) {

      this.colores = colores[2];
      
    }else if (array[1] == array[0] + 5 && array[2] == array[1] + 5 && array[3] == array[2] + 5 || array[4] == array[3] + 5 && array[3] == array[2] + 5 && array[2] == array[1] + 5) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 6 && array[2] == array[1] + 6 && array[3] == array[2] + 6 || array[4] == array[3] + 6 && array[3] == array[2] + 6 && array[2] == array[1] + 6) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 7 && array[2] == array[1] + 7 && array[3] == array[2] + 7 || array[4] == array[3] + 7 && array[3] == array[2] + 7 && array[2] == array[1] + 7) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 8 && array[2] == array[1] + 8 && array[3] == array[2] + 8 || array[4] == array[3] + 8 && array[3] == array[2] + 8 && array[2] == array[1] + 8) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 9 && array[2] == array[1] + 9 && array[3] == array[2] + 9 || array[4] == array[3] + 9 && array[3] == array[2] + 9 && array[2] == array[1] + 9) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 10 && array[2] == array[1] + 10 && array[3] == array[2] + 10 || array[4] == array[3] + 10 && array[3] == array[2] + 10 && array[2] == array[1] + 10) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 11 && array[2] == array[1] + 11 && array[3] == array[2] + 11 || array[4] == array[3] + 11 && array[3] == array[2] + 11 && array[2] == array[1] + 11) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 12 && array[2] == array[1] + 12 && array[3] == array[2] + 12 || array[4] == array[3] + 12 && array[3] == array[2] + 12 && array[2] == array[1] + 12) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 13 && array[2] == array[1] + 13 && array[3] == array[2] + 13 || array[4] == array[3] + 13 && array[3] == array[2] + 13 && array[2] == array[1] + 13) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 2 && array[2] == array[1] + 2 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 3 && array[2] == array[1] + 3 && array[3] == array[2] + 1) {

      this.colores = colores[2];

    }else if (array[1] == array[0] + 4 && array[2] == array[1] + 4 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 5 && array[2] == array[1] + 5 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 6 && array[2] == array[1] + 6 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 7 && array[2] == array[1] + 7 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 8 && array[2] == array[1] + 8 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 9 && array[2] == array[1] + 9 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 10 && array[2] == array[1] + 10 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 11 && array[2] == array[1] + 11 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 12 && array[2] == array[1] + 12 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else if (array[1] == array[0] + 13 && array[2] == array[1] + 13 && array[3] == array[2] + 1) {
      
      this.colores = colores[2];

    }else{

      this.colores = colores[0];

    }

  }*/

  /*random(){

    let resultado = [];
    let omitir = [];

    if (this.inc1 == undefined || this.inc2 == undefined) {

        omitir.push(this.exc1, this.exc2);

        if (this.inc1 != undefined) {

          resultado.push(this.inc1);
          let i = 0;
          let x = 0;
          let y = 0;
          let z = 0;

          i = parseInt(this.getRandomArbitrary(1,41));
          y = parseInt(this.getRandomArbitrary(1,41));
          x = parseInt(this.getRandomArbitrary(1,41));
          z = parseInt(this.getRandomArbitrary(1,41));

          resultado.push(i, x, y, z);
          let indice = resultado.length, temporaryValue, randomIndex;

          while(0 !== indice){

            randomIndex = Math.floor(Math.random() * indice);
            indice -= 1;
            temporaryValue = resultado[indice];
            resultado[indice] = resultado[randomIndex];
            resultado[randomIndex] = temporaryValue;

          }
           
          const array = resultado.sort((a, b) => a - b);
          const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
          localStorage.setItem('numero', numero);

        }else{

          resultado.push(this.inc2);
          let i = 0;
          let x = 0;
          let y = 0;
          let z = 0;

          i = parseInt(this.getRandomArbitrary(1,41));
          y = parseInt(this.getRandomArbitrary(1,41));
          x = parseInt(this.getRandomArbitrary(1,41));
          z = parseInt(this.getRandomArbitrary(1,41));

          resultado.push(i, x, y, z);
          let indice = resultado.length, temporaryValue, randomIndex;

          while(0 !== indice){

            randomIndex = Math.floor(Math.random() * indice);
            indice -= 1;
            temporaryValue = resultado[indice];
            resultado[indice] = resultado[randomIndex];
            resultado[randomIndex] = temporaryValue;

          }
           
          const array = resultado.sort((a, b) => a - b);
          const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
          localStorage.setItem('numero', numero);

        }

      }else if (this.inc1 == undefined && this.inc2 == undefined) {

        omitir.push(this.exc1, this.exc2);
        let a = 0;
        let i = 0;
        let x = 0;
        let y = 0;
        let z = 0;

        a = parseInt(this.getRandomArbitrary(1,41));
        i = parseInt(this.getRandomArbitrary(1,41));
        y = parseInt(this.getRandomArbitrary(1,41));
        x = parseInt(this.getRandomArbitrary(1,41));
        z = parseInt(this.getRandomArbitrary(1,41));

        resultado.push(a,i, x, y, a);

        const array = resultado.sort((a, b) => a - b);
        const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
        localStorage.setItem('numero', numero);

      }else{

        omitir.push(this.exc1, this.exc2);
        resultado.push(this.inc1, this.inc2);
        let i = 0;
        let x = 0;
        let y = 0;

        i = parseInt(this.getRandomArbitrary(1,41));
        y = parseInt(this.getRandomArbitrary(1,41));
        x = parseInt(this.getRandomArbitrary(1,41));
        resultado.push(i, x, y);

        let indice = resultado.length, temporaryValue, randomIndex;

        while(0 !== indice){

          randomIndex = Math.floor(Math.random() * indice);
          indice -= 1;
          temporaryValue = resultado[indice];
          resultado[indice] = resultado[randomIndex];
          resultado[randomIndex] = temporaryValue;

        }
       
        const array = resultado.sort((a, b) => a - b);
        const numero = array[0].toString() + '-' + array[1].toString() + '-' + array[2].toString() + '-' + array[3].toString() + '-' + array[4].toString();
        localStorage.setItem('numero', numero);
        this.resultado.push(array[0], array[1], array[2], array[3], array[4]);

      }
  }*/

  toggle(event){

  	const menu = document.getElementById("menu");
    const app = document.getElementById("game");

  	if (menu.style.display == 'none') {

      app.style.display = 'none';
  		menu.style.display = 'block';

  	}else{

  		menu.style.display = 'none';
      app.style.display = 'block';

  	}
  }

  /*scrapping(){
    this.comunicacion.tabla().subscribe((data: any) => {

      let info = [data['dias'][0]];
      let info2 = [data['fechas'][0]];
      let info3:any = [data['numeros'][0]];
      let dias = [];
      let fechas = [];
      let numeros = [];
      let ultimos = [];
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
      }

      //localStorage.setItem('ultimos', JSON.stringify(ultimos));
      
      for (let i = 0; i <= 7; i++) {

        let obj = info3[i];

        for (let key in obj) {

          numeros.push(obj[key]);

        }

        for (let key in info3[i].dia1) {

          console.log('key',key);
          numeros.push(info3[i].dia1[key]);

        }

      }
      
      
      localStorage.setItem('numeros', JSON.stringify(numeros));

      // console.log(this.ultimes);
      //console.log(data['numeros'][0].dia1);

      // console.log(this.ultimes);

    }, Error => {
      console.log(Error)
    });

  }*/
  /*numeros(event){

    this.data.numero = localStorage.getItem('numero');
    this.data.correo = localStorage.getItem('correo');
    const jsono = { 
      numero: this.data.numero,
      correo: this.data.correo
    };
    
    this.comunicacion.number(jsono).subscribe((data) => {

      if (data.respuesta == 'nousuario') {
        
        alert('Usuario no está en sesión');
        this.router.navigateByUrl('/home');

      }else{

        alert('Número enviado exitosamente');
      
      }
      
    }, Error => {
      console.log(Error);
    });
  }*/

 /* reloj(){

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

      document.getElementById("hh1").innerHTML = this.hour;
      document.getElementById("mh1").innerHTML = this.minute;
      document.getElementById("sh1").innerHTML = this.second;

      if (this.hour == 0 && this.minute == 0 && this.second == 0) {

        console.log('El sorteo ha finalizado');
        localStorage.removeItem('numeros');
        localStorage.removeItem('fechas');
        localStorage.removeItem('dias');
        localStorage.removeItem('ultimos');
        this.scrapping();

       }
    }

    let intervalo = setInterval(mostrar_hora, 1000);

  }*/

  salir(event){
    this.router.navigateByUrl('/home');
  }

  reloj()
  {
    console.log('reloj');
    function CountdownTracker(label, value){

      var el = document.createElement('span');

      el.className = 'flip-clock__piece';
      el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' + 
        '<span class="flip-clock__slot">' + label + '</span>';

      this.el = el;

      var top = el.querySelector('.card__top') as HTMLElement,
          bottom = el.querySelector('.card__bottom'),
          back = el.querySelector('.card__back'),
          backBottom = el.querySelector('.card__back .card__bottom');

      this.update = function(val){
        val = ( '0' + val ).slice(-2);
        if ( val !== this.currentValue ) {
          
          if ( this.currentValue >= 0 ) {
            back.setAttribute('data-value', this.currentValue);
            bottom.setAttribute('data-value', this.currentValue);
          }
          this.currentValue = val;
          top.innerText = this.currentValue;
          backBottom.setAttribute('data-value', this.currentValue);

          this.el.classList.remove('flip');
          void this.el.offsetWidth;
          this.el.classList.add('flip');
        }
      }
      
      this.update(value);
    }

    // Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date().toString());
      return {
        'Total': t,
        // 'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
        '<p>ORE</p>': Math.floor((t / (1000 * 60 * 60)) % 24),
        '<p>MINUTI</p>': Math.floor((t / 1000 / 60) % 60),
        '<p>SECONDI</p>': Math.floor((t / 1000) % 60)
      };
    }

    function getTime() {
      var t = new Date();
      return {
        'Total': t,
        'Hours': t.getHours() % 12,
        'Minutes': t.getMinutes(),
        'Seconds': t.getSeconds()
      };
    }

    function Clock(countdown,callback) {
      
      countdown = countdown ? new Date(Date.parse(countdown)) : false;
      callback = callback || function(){};
      
      var updateFn = countdown ? getTimeRemaining : getTime;

      this.el = document.createElement('div');
      this.el.className = 'flip-clock';

      var trackers = {},
          t = updateFn(countdown),
          key, timeinterval;

      for ( key in t ){
        if ( key === 'Total' ) { continue; }
        trackers[key] = new CountdownTracker(key, t[key]);
        this.el.appendChild(trackers[key].el);
      }

      var i = 0;
      function updateClock() {
        timeinterval = requestAnimationFrame(updateClock);
        
        // throttle so it's not constantly updating the time.
        if ( i++ % 10 ) { return; }
        
        var t = updateFn(countdown);
        if ( t.Total < 0 ) {
          cancelAnimationFrame(timeinterval);
          for ( key in trackers ){
            trackers[key].update( 0 );
          }
          callback();
          return;
        }
        
        for ( key in trackers ){
          trackers[key].update( t[key] );
        }
      }

      setTimeout(updateClock,500);
    }

    let mins8 = moment(moment().format('YYYY-MM-DD 20:00'));
    let now;

    let restante = mins8.diff(moment(),'seconds');

    if (restante < 0) {
      now = moment(moment(new Date()).add(1,'days').format('YYYY-MM-DD 20:00'));
    }else{
      now = moment(moment().format('YYYY-MM-DD 20:00'));
    }

    // var deadline = new Date(Date.parse(new Date().toString()) + 12 * 24 * 60 * 60 * 1000);
    var deadline = new Date(Date.parse(now));
    var c = new Clock(deadline, function(){ alert('countdown complete') });
    document.getElementById('tiempo').appendChild(c.el);

    // var clock = new Clock(null,null);
    // document.getElementById('tiempo').appendChild(clock.el);
  }

}
