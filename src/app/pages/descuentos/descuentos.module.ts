import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescuentosRoutingModule } from './descuentos-routing.module';
import { AgregarComponent } from './agregar/agregar.component';
import { PrincipalComponent } from './principal/principal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorComponent } from '../buscador/buscador.component';
import { BuscadorModule } from '../buscador/buscador.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AgregarComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    DescuentosRoutingModule,
    ReactiveFormsModule,
    BuscadorModule,
    NgbTooltipModule
  ]
})
export class DescuentosModule { }
