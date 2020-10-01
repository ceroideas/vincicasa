import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-selezionis',
  templateUrl: './selezionis.page.html',
  styleUrls: ['./selezionis.page.scss'],
})
export class SelezionisPage implements OnInit {

  checks = [
  	"NUMERI CASUALI – Combinazione casuale dei numeri.",
  	"DAMMI LA SECONDA – Una volta eseguito il calcolo  analizza e muta lo stesso.",
  	"SALTA LA FUNZIONE – esegui un cambio di calcolo.",
  	"VINCOLA LE VARIABILI – il calcolo finale vincola alcune variabili in modo random.",
  	"SEMPLIFICA LE VARIABILI - La combinazione viene data considerando un numero ridotto delle variabili."
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

}
