import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComunicacionService } from '../comunicacion.service';

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

  constructor(public nav: NavController, private service: ComunicacionService) { }

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

  guardar()
  {
    localStorage.setItem('no-menu-return-back','1');
    this.actualizar();
  }

  actualizar()
  {
   let correo = {

    correo: localStorage.getItem('correo'),
    combinaciones: localStorage.getItem('ufechas') || "",
    incluidos: localStorage.getItem('incluidos')  || "",
    excluidos: localStorage.getItem('excluidos')  || "",
    reglas: localStorage.getItem('checks')  || ""
   };

    console.log(correo,"correo");

    this.service.actualizar_combinaciones(correo).subscribe((data:any) => {

      console.log('Datos actualizados');

    }, Error => {

      console.log(Error);

    });
  }

}
