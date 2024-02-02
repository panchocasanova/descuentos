import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorComponent } from './buscador.component';
import { BuscarRutComponent } from './buscar-rut/buscar-rut.component';
import { BuscarApellidoComponent } from './buscar-apellido/buscar-apellido.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoFuncionariosComponent } from './listado-funcionarios/listado-funcionarios.component';

import { NgbDatepickerModule, NgbPaginationModule, NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    BuscadorComponent,
    BuscarRutComponent,
    BuscarApellidoComponent,
    ListadoFuncionariosComponent
  ],
  imports: [
    CommonModule,
    BuscadorRoutingModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    NgbAlertModule,
    NgbDropdownModule
  ],
  exports:[
    BuscadorComponent,
  ]
})
export class BuscadorModule { }
