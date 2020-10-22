import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-selezionis',
  templateUrl: './selezionis.page.html',
  styleUrls: ['./selezionis.page.scss'],
})
export class SelezionisPage implements OnInit {

  checks = [
  	"ESEGUI UN DOPPIO PROCESSO DI CALCOLO – La combinazione viene riformulata dopo il primo processo.",
  	"ESEGUI UN METODO DI RIDUZIONE – considerando un numero ridotto delle variabili.",
  	"ESTRAPOLA UN SISTEMA – Fornisce la combinazione basandosi su un sistema di numeri casuali.",
  	"SALTA LA FUNZIONE – Il processo considera un numero di calcolo più semplice.",
  	"VINCOLA LE VARIABILI – nel calcolo sono vincolati delle variabili in modo random."
  ];

  checked:any = [];

  constructor(public nav: NavController) { }

  ngOnInit() {
    if (localStorage.getItem('checks')) {
      this.checked = JSON.parse(localStorage.getItem('checks'));
    }
  }

  seleccionar(i)
  {
    let exists = this.checked.findIndex(x=>x==i);

    if (exists === -1) {
      this.checked.push(i)
    }else{
      this.checked.splice(exists,1);
    }

    console.log(this.checked);

    localStorage.setItem('checks',JSON.stringify(this.checked));
  }

  cambiarAutomatico()
  {
    // localStorage.setItem('cambiarAutomatico','1');
  }

}
