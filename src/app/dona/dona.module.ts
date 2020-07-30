import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonaPageRoutingModule } from './dona-routing.module';

import { DonaPage } from './dona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonaPageRoutingModule
  ],
  declarations: [DonaPage]
})
export class DonaPageModule {}
