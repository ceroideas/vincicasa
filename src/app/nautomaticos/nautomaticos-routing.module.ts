import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NautomaticosPage } from './nautomaticos.page';

const routes: Routes = [
  {
    path: '',
    component: NautomaticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NautomaticosPageRoutingModule {}
