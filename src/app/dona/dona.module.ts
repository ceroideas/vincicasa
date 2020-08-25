import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonaPageRoutingModule } from './dona-routing.module';

import { DonaPage } from './dona.page';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonaPageRoutingModule
  ],
  declarations: [DonaPage],
  providers: [PayPal]
})
export class DonaPageModule {}
