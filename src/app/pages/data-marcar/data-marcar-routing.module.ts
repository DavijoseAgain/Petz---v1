import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataMarcarPage } from './data-marcar.page';

const routes: Routes = [
  {
    path: '',
    component: DataMarcarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataMarcarPageRoutingModule {}
