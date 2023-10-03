import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InformeTrimestralService } from './informe-trimestral.service';

@Injectable({
  providedIn: 'root'
})
export class InformeTrimestralResolver implements Resolve<any> {

  constructor(private informeTrimestralService: InformeTrimestralService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.informeTrimestralService.getAnnosAll();
  }
}
