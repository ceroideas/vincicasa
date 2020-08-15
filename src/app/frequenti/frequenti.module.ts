import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrequentiPageRoutingModule } from './frequenti-routing.module';

import { FrequentiPage } from './frequenti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrequentiPageRoutingModule
  ],
  declarations: [FrequentiPage]
})
export class FrequentiPageModule {}
