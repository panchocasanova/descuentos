import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRemunetoken } from '../interfaces/remuneLoginUser.interface';
import { map, of, tap, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthRemuneService {
  private apiRemune: string = `${environment.remuneAPI}`;
  private tokenLocalStorageRemune = 'tokenRemune';
  private sitio = 'LIQ';

  constructor(private http: HttpClient, private router: Router) { }


  loginRemune(rut: string, ip: string){
    const url = `${this.apiRemune}/login`;
    //console.log(url);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const params = new HttpParams()
      .append('rut', rut)
      //.append('sitio', this.sitio)
      //.append('ip', ip)
    return this.http.post<LoginRemunetoken>(url, "", { headers, params} )
      .pipe(
        tap( response => {
          //console.log('token auth remune', response);
          const tokenRemune = this.setTokenRemuneLS(response);
          // console.log('tokenremuneboolean', tokenRemune);
          return tokenRemune;
        })
      )
  }

  private setTokenRemuneLS(token: LoginRemunetoken): boolean {
    if(token){
      localStorage.setItem(this.tokenLocalStorageRemune, JSON.stringify(token.token))
      return true
    }
    return false
  }

  private getTokenRemuneLS(){
    try{
      const valor = localStorage.getItem(this.tokenLocalStorageRemune)
      if(!valor){
        return undefined
      }
      const token = JSON.parse(valor);
      return token;
    }catch (error){
      // console.log(error)
      return undefined
    }
  }

  validarTokenRemune():Observable<boolean>{
    const url = `${this.apiRemune}/validar_token`;
    const cabecera = new HttpHeaders()
            .set('Accept','application/json')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization','Bearer '+ this.getTokenRemuneLS());
    return this.http.get(url, {headers: cabecera})
            .pipe(
              map( resp => {
                // console.log('validarTokenRemune', resp)
                return true
              }),
              catchError(err => of(false))
            )
  }

  logoutremune() {
    localStorage.clear()
    //localStorage.removeItem(this.tokenLocalStorage);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }
}
