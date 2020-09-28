import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelezionisPageRoutingModule } from './selezionis-routing.module';

import { SelezionisPage } from './selezionis.page';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    SelezionisPageRoutingModule
  ],
  declarations: [SelezionisPage]
})
export class SelezionisPageModule {}
