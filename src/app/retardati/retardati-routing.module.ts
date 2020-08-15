import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetardatiPage } from './retardati.page';

const routes: Routes = [
  {
    path: '',
    component: RetardatiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetardatiPageRoutingModule {}
