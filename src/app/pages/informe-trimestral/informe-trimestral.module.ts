import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeTrimestralRoutingModule } from './informe-trimestral-routing.module';
import { InformeTrimestralComponent } from './informe-trimestral.component';
import { GenerarComponent } from './generar/generar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InformeTrimestralComponent,
    GenerarComponent
  ],
  imports: [
    CommonModule,
    InformeTrimestralRoutingModule,
    ReactiveFormsModule
  ]
})
export class InformeTrimestralModule { }
