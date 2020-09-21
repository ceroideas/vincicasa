import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
