import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombinazionePage } from './combinazione.page';

const routes: Routes = [
  {
    path: '',
    component: CombinazionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombinazionePageRoutingModule {}
