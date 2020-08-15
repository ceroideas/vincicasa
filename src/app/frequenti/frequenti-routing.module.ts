import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrequentiPage } from './frequenti.page';

const routes: Routes = [
  {
    path: '',
    component: FrequentiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrequentiPageRoutingModule {}
