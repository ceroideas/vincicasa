import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage implements OnInit {

  fechas = JSON.parse(localStorage.getItem('ufechas'));

  constructor(public modal: ModalController) {
  	this.fechas = this.fechas.sort((a,b)=> b.date - a.date);
  }

  ngOnInit() {
  }

}
