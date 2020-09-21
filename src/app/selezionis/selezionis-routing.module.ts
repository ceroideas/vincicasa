import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelezionisPage } from './selezionis.page';

const routes: Routes = [
  {
    path: '',
    component: SelezionisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelezionisPageRoutingModule {}
