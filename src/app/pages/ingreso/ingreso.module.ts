import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresoComponent } from './ingreso.component';
import { BuscadorComponent } from '../buscador/buscador.component';


@NgModule({
  declarations: [
    IngresoComponent,
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class IngresoModule { }
