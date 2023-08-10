import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
} from '@angular/router';
import { AuthTicService } from './auth-tic.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authTicService: AuthTicService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {  
    //? verifico si existe un token en el localstorage, si es asi, lo compruebo con la api para validar
    return this.authTicService.validarToken()
            .pipe(
              tap( valid => {
                //console.log('canActivate',valid)
                if(!valid ){
                  this.authTicService.logout()
                  this.router.navigateByUrl('/auth/login')
                }
              })
            );
  }

  canLoad():Observable<boolean> | boolean {
    //? verifico si existe un token en el localstorage, si es asi, lo compruebo con la api para validar
    return this.authTicService.validarToken()
            .pipe(
              tap( valid => {
                //console.log('canLoad',valid)
                if(!valid ){
                  this.authTicService.logout()
                  this.router.navigateByUrl('/auth/login')
                }
              })
            );
  }
}
