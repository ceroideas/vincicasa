import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MnumerosPage } from './mnumeros.page';

const routes: Routes = [
  {
    path: '',
    component: MnumerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MnumerosPageRoutingModule {}
