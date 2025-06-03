import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarPetPage } from './cadastrar-pet.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarPetPageRoutingModule {}
