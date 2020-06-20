import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MnumerosPageRoutingModule } from './mnumeros-routing.module';

import { MnumerosPage } from './mnumeros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MnumerosPageRoutingModule
  ],
  declarations: [MnumerosPage]
})
export class MnumerosPageModule {}
