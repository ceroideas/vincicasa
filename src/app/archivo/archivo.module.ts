import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivoPageRoutingModule } from './archivo-routing.module';

import { ArchivoPage } from './archivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivoPageRoutingModule
  ],
  declarations: [ArchivoPage]
})
export class ArchivoPageModule {}
