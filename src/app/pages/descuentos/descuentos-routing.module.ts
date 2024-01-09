import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
  path:'',
  component: PrincipalComponent
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
