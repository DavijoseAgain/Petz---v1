import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPetPageRoutingModule } from './cadastrar-pet-routing.module';

import { CadastrarPetPage } from './cadastrar-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPetPageRoutingModule
  ],
  declarations: [CadastrarPetPage]
})
export class CadastrarPetPageModule {}
