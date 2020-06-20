import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NautomaticosPageRoutingModule } from './nautomaticos-routing.module';

import { NautomaticosPage } from './nautomaticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NautomaticosPageRoutingModule
  ],
  declarations: [NautomaticosPage]
})
export class NautomaticosPageModule {}
