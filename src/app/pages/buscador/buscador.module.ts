import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorComponent } from './buscador.component';
import { BuscarRutComponent } from './buscar-rut/buscar-rut.component';
import { BuscarApellidoComponent } from './buscar-apellido/buscar-apellido.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BuscadorComponent,
    BuscarRutComponent,
    BuscarApellidoComponent
  ],
  imports: [
    CommonModule,
    BuscadorRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    BuscadorComponent,
  ]
})
export class BuscadorModule { }
