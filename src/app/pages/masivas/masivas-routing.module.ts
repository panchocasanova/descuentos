import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MasivasComponent } from './masivas/masivas.component';
import { BuscadorComponent } from './buscador/buscador.component';

const routesMasivas : Routes = [
  {
    path:'',
    component: MasivasComponent,
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
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routesMasivas)
  ],
  exports:[
    RouterModule
  ]
})
export class MasivasRoutingModule { }
