import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard';
import { AuthRemuneGuard } from '../modules/auth/services/auth-remune.guard';


const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // {
  //   path: 'builder',
  //   loadChildren: () =>
  //     import('./builder/builder.module').then((m) => m.BuilderModule),
  // },

 /*  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  }, */
  {
    path: 'masivas',
    loadChildren:() => import('../pages/masivas/masivas.module').then((m) => m.MasivasModule),
    canActivate: [AuthGuard, AuthRemuneGuard],
    canLoad: [AuthGuard, AuthRemuneGuard]
  },
  /* {
    path: 'paginas/informacion-del-funcionario',
    loadChildren: () =>
      import('../pages/info-funcionario/info-funcionario.module').then((m) => m.InfoFuncionarioModule),
      canActivate: [ AuthGuard, AuthRemuneGuard ],
      canLoad: [ AuthGuard, AuthRemuneGuard ]
  }, */
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
