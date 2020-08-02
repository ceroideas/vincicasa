import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificaPageRoutingModule } from './verifica-routing.module';

import { VerificaPage } from './verifica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificaPageRoutingModule
  ],
  declarations: [VerificaPage]
})
export class VerificaPageModule {}
