import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSeleccionPageRoutingModule } from './modal-seleccion-routing.module';

import { ModalSeleccionPage } from './modal-seleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSeleccionPageRoutingModule
  ],
  declarations: [ModalSeleccionPage]
})
export class ModalSeleccionPageModule {}
