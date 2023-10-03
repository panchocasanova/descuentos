import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './ingreso.component';
import { BuscadorComponent } from '../buscador/buscador.component';

const routesLicenciasMedicas: Routes = [
  {
    path: '',
    component: IngresoComponent,
    children:[
      {
        path: 'buscador',
        component: BuscadorComponent
      },
      {
        path: '**',
        redirectTo: 'buscador', pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routesLicenciasMedicas)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
