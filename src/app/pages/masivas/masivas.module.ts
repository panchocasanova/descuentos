import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { BuscadorComponent } from './buscador/buscador.component';
import { MasivasComponent } from './masivas/masivas.component';
import { MasivasRoutingModule } from './masivas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarFuncionariosComponent } from './listar-funcionarios/listar-funcionarios.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbDatepickerModule, NgbPaginationModule, NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioLiquidacionComponent } from './funcionario-liquidacion/funcionario-liquidacion.component';
import { BuscadorrutComponent } from './buscadorrut/buscadorrut.component';

@NgModule({
  declarations: [
    BuscadorComponent,
    MasivasComponent,
    ListarFuncionariosComponent,
    FuncionarioLiquidacionComponent,
    BuscadorrutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MasivasRoutingModule,
    InlineSVGModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    NgbAlertModule,
    JsonPipe,
    FormsModule,
    NgbDropdownModule
  ]
})
export class MasivasModule { }
