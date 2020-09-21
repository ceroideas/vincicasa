import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelezionisPageRoutingModule } from './selezionis-routing.module';

import { SelezionisPage } from './selezionis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelezionisPageRoutingModule
  ],
  declarations: [SelezionisPage]
})
export class SelezionisPageModule {}
