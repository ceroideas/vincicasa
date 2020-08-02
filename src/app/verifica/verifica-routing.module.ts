import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificaPage } from './verifica.page';

const routes: Routes = [
  {
    path: '',
    component: VerificaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificaPageRoutingModule {}
