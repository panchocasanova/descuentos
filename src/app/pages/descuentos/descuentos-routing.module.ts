import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ValidarComponent } from './validar/validar.component';
import { reparticionResolver } from '../resolver/reparticion.resolver';

const routes: Routes = [
  {
  path:'',
  component: PrincipalComponent
},
{
  path:'validar',
  component: ValidarComponent,
  resolve: { ing: reparticionResolver}

},
{
  path:'**',
  redirectTo: ''

},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescuentosRoutingModule { }
