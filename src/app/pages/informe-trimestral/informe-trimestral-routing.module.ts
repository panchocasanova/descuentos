import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformeTrimestralComponent } from './informe-trimestral.component';
import { GenerarComponent } from './generar/generar.component';
import { InformeTrimestralResolver } from './services/informe-trimestral.resolver';
const routes: Routes = [
  {
    path: '',
    component: InformeTrimestralComponent,
    resolve: {
      annos: InformeTrimestralResolver
    },
    children:[
      {
        path: 'generar',
        component: GenerarComponent
      },
      {
        path: '**',
        redirectTo: 'generar', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformeTrimestralRoutingModule { }
