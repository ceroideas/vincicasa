import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarPage } from './recuperar.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarPage
  },
  {
    path: 'cambio',
    loadChildren: () => import('./cambio/cambio.module').then( m => m.CambioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarPageRoutingModule {}
