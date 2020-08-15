import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetardatiPageRoutingModule } from './retardati-routing.module';

import { RetardatiPage } from './retardati.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetardatiPageRoutingModule
  ],
  declarations: [RetardatiPage]
})
export class RetardatiPageModule {}
