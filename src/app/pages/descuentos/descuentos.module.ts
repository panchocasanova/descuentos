import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescuentosRoutingModule } from './descuentos-routing.module';
import { AgregarComponent } from './agregar/agregar.component';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscadorComponent } from '../buscador/buscador.component';
import { BuscadorModule } from '../buscador/buscador.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidarComponent } from './validar/validar.component';


@NgModule({
  declarations: [
    AgregarComponent,
    PrincipalComponent,
    ValidarComponent
  ],
  imports: [
    CommonModule,
    DescuentosRoutingModule,
    ReactiveFormsModule,
    BuscadorModule,
    NgbTooltipModule,
    FormsModule
  ]
})
export class DescuentosModule { }
