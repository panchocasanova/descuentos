import { ResolveFn } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const dashboardResolver: ResolveFn<any> = (route, state) => {
  const gs = inject(GeneralService);
  return gs.usuario().pipe(
    map(data =>{
      //console.log(data.perfil);
      return data.perfil

    })
  )
};
