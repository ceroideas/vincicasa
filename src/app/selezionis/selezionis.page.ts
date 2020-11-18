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
  	"<span class='title'> ESEGUI UN DOPPIO PROCESSO DI CALCOLO </span> La combinazione viene riformulata dopo il primo processo.",
  	"<span class='title'> ESEGUI UN METODO DI RIDUZIONE </span> considera un numero ridotto delle variabili.",
  	"<span class='title'> ESTRAPOLA UN SISTEMA </span> Fornisce la combinazione basandosi su un sistema di numeri casuali.",
  	"<span class='title'> SALTA LA FUNZIONE </span> Il processo considera un numero di calcolo più semplice.",
  	"<span class='title'> VINCOLA LE VARIABILI </span> nel calcolo sono vincolati delle variabili in modo random."
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
    reglas: localStorage.getItem('checks')  || "",
    lastNotification: localStorage.getItem('last-notification') || "",
    lastClick: localStorage.getItem('horaClick') || "",
    
   };

    console.log(correo,"correo");

    this.service.actualizar_combinaciones(correo).subscribe((data:any) => {

      console.log('Datos actualizados');

    }, Error => {

      console.log(Error);

    });
  }

}
