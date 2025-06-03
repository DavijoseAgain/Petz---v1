import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataMarcarPageRoutingModule } from './data-marcar-routing.module';

import { DataMarcarPage } from './data-marcar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataMarcarPageRoutingModule
  ],
  declarations: [DataMarcarPage]
})
export class DataMarcarPageModule {}
