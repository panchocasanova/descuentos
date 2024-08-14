import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WidgetsModule } from '../../_metronic/partials';
import { dashboardResolver } from '../resolver/dashboard.resolver';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        resolve:{
          perfil: dashboardResolver
        }
      },
    ]),
    WidgetsModule,
  ],
})
export class DashboardModule {}
