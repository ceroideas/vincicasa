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
	hoy: any = moment();
	contador: number = parseInt(JSON.parse(localStorage.getItem('contador')));
  hour: any;
  minute: any;
  second: any;
  tiempo: any = [];

  
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

  	this.hoy = this.hoy.format('DD') + ' ' + this.meses[ this.hoy.format('M')-1 ] + ' ' + this.hoy.format('YYYY');

    // console.log(this.hoy)

  }

  ngOnInit() {

    let horaAutomatico = moment(localStorage.getItem('horaAutomatico'));
    console.log(horaAutomatico);

  	this.service.changeData(this.usuario);
    this.reloj();

  	if (localStorage.getItem('excluidos') && localStorage.getItem('excluidos') != undefined) {
  		
  		this.excluir = JSON.parse(localStorage.getItem('excluidos'));
  	
  	}else{
  		
  		localStorage.setItem('excluidos', JSON.stringify(this.excluir));

  	}

    if (localStorage.getItem('ufechas') && localStorage.getItem('ufechas') != undefined) {

      this.fechas = JSON.parse(localStorage.getItem('ufechas'));

      if (this.hoy != this.fechas[0]) {

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
  		
      if (fechas.findIndex(x=>x==this.hoy) == -1) {
        this.random(true);
      }else{
  		  this.combinacion = JSON.parse(localStorage.getItem('combinacion'));
      }
  	
  	}else{
  		
      this.random(true);
  		localStorage.setItem('combinacion', JSON.stringify(this.combinacion));

  	}

  	if (localStorage.getItem('incluidos') && localStorage.getItem('incluidos') != undefined) {
  		
  		this.incluir = JSON.parse(localStorage.getItem('incluidos'));

  	}else{

  		localStorage.setItem('incluidos', JSON.stringify(this.incluir));

  	}

  	if (localStorage.getItem('ultimos') && localStorage.getItem('ultimos') != undefined) {

  		this.ultimos = JSON.parse(localStorage.getItem('ultimos'));
      //this.ultimos = this.ultimos.reverse();
  	
  	}else{

  		this.ultimos = [];
  		localStorage.setItem('ultimos', JSON.stringify(this.ultimos));

  	}

    setTimeout(()=>{

      if (localStorage.getItem('random')) {
        localStorage.removeItem('random');
        this.random();
      }
      
    },1000)


  }

  getRandomArbitrary(min, max, n:any = [], exc:any = []){

	  let number = Math.floor(Math.random() * (max - min) + min);
	  let a = 0;

  	for (let i = 0; i < n.length; i++) {
  		if (n[i] == number) {
  			a++;
  		}
  	}

  	for (let i = 0; i < exc.length; i++) {
  		if (exc[i] == number) {
  			a++;
  		}
  	}

  	if (a > 0) {

  		return this.getRandomArbitrary(min, max, n);

  	}else{

  		return number;

  	}

  }

  random(automatico = false){

    this.fechas = this.fechas.reverse();
    let ultimos = [];
    if (localStorage.getItem('ultimos')) {
      ultimos = JSON.parse(localStorage.getItem('ultimos')).reverse();
    }
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

    console.log(this.combinacion);

		for (var i = 0; i < (5 - this.incluir.length); i++) {	
			this.combinacion.push( this.getRandomArbitrary(1, 55, this.combinacion, this.excluir) );
		}

		this.combinacion = this.combinacion.sort((a,b)=> a - b);

    let final = ultimos.length;

    let idx = this.fechas.findIndex(x=>x==this.hoy);

    if (idx != -1) {

      // console.log(1)
      ultimos[idx] = this.combinacion;
      // this.fechas[final - 1] = this.hoy;

    }else{

      // console.log(2)

      ultimos.push(this.combinacion);
      this.fechas.push(this.hoy);

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

    if (ultimos.length == 4 && this.fechas.length == 4) {

      this.fechas.shift();
      ultimos.shift();

    }

    localStorage.setItem('ultimos', JSON.stringify(ultimos.reverse()));
    localStorage.setItem('ufechas', JSON.stringify(this.fechas.reverse()));
		localStorage.setItem('combinacion', JSON.stringify(this.combinacion));
    if (automatico) {
      localStorage.removeItem('horaClick');
      localStorage.removeItem('contador');
      localStorage.setItem('horaAutomatico', moment().format('YYYY-MM-DD HH:mm:ss'));
    }else{
		  localStorage.setItem('contador', JSON.stringify(this.contador));
		  localStorage.setItem('horaClick', moment().format('YYYY-MM-DD HH:mm:ss'));
    }

    this.ultimos = ultimos;

	}

  reloj(){

    let mostrar_hora = () => {

      let mins8 = moment(moment().format('YYYY-MM-DD 19:06'));
      let now;

      let restante = mins8.diff(moment(),'seconds');

      if (restante <= 0) {

        now = moment(moment(new Date()).add(1,'days').format('YYYY-MM-DD 19:06'));

      }else{

        now = moment(moment().format('YYYY-MM-DD 19:06'));

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

      // if (this.hour == 0 && this.minute == 0 && this.second == 0) {
      if (seconds == 86400) {

        this.combinacion = [];

        localStorage.setItem('combinacion', JSON.stringify(this.combinacion));
        
        this.random(true);
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

}