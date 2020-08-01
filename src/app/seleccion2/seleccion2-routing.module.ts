import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Seleccion2Page } from './seleccion2.page';

const routes: Routes = [
  {
    path: '',
    component: Seleccion2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Seleccion2PageRoutingModule {}
