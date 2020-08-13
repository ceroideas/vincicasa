import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificaPageRoutingModule } from './verifica-routing.module';

import { VerificaPage } from './verifica.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificaPageRoutingModule,
    PipesModule
  ],
  declarations: [VerificaPage]
})
export class VerificaPageModule {}
