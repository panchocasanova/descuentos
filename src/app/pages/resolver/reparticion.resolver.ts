import { ResolveFn } from '@angular/router';
import { GeneralService } from '../services/general.service';
import {  inject } from '@angular/core';
import { DescuentosService } from '../descuentos/services/descuentos.service';
import { map, switchMap } from 'rxjs';

export const reparticionResolver: ResolveFn<any> = (route, state) => {

  const gs = inject(GeneralService);
  const ds = inject(DescuentosService)
  return gs.reparticionUsuario().pipe(
    switchMap(resul1 =>{
      return ds.buscarIngresos(resul1).pipe(
        map(res =>{
          return res
        })
      )


    })
  )
};
