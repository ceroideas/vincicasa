import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Seleccion2PageRoutingModule } from './seleccion2-routing.module';

import { Seleccion2Page } from './seleccion2.page';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    Seleccion2PageRoutingModule
  ],
  declarations: [Seleccion2Page]
})
export class Seleccion2PageModule {}
