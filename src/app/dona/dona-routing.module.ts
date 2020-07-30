import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonaPage } from './dona.page';

const routes: Routes = [
  {
    path: '',
    component: DonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonaPageRoutingModule {}
