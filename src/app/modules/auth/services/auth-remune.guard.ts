import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRemuneService } from './auth-remune.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthRemuneGuard implements CanActivate, CanLoad {
  constructor(private AuthRemuneService: AuthRemuneService, private router: Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    //return true;
    return this.AuthRemuneService.validarTokenRemune()
              .pipe(
                tap( valid => {
                  //console.log('canActivate-remune',valid)
                  if(!valid){
                    this.AuthRemuneService.logoutremune();
                    this.router.navigateByUrl('auth/login')
                  }
                })
              );
  }
  canLoad(): Observable<boolean> | boolean{
    return this.AuthRemuneService.validarTokenRemune()
              .pipe(
                tap( valid => {
                  //console.log('canLoad-remune',valid)
                  if(!valid){
                    this.AuthRemuneService.logoutremune()
                    this.router.navigateByUrl('auth/login')
                  }
                })
              );
  }
}
