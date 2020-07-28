import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CombinazionePageRoutingModule } from './combinazione-routing.module';

import { CombinazionePage } from './combinazione.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombinazionePageRoutingModule
  ],
  declarations: [CombinazionePage]
})
export class CombinazionePageModule {}
