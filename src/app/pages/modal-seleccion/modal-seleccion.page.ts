import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-modal-seleccion',
  templateUrl: './modal-seleccion.page.html',
  styleUrls: ['./modal-seleccion.page.scss'],
})
export class ModalSeleccionPage implements OnInit {

  constructor(public events: EventsService, public modal: ModalController) { }

  ngOnInit() {
  }

  routes(i)
  {
  	if (i == 1) {
  		this.events.publish('doRandom');
  	}else{
  		this.events.publish('doCambio');
  	}

  	this.modal.dismiss();
  }

}
