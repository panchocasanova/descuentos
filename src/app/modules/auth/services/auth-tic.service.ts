import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap, finalize, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


import { LoginResponseToken } from '../interfaces/login.interface';
import { DataUserTic } from '../interfaces/dataUser.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthTicService {


  private apiTIC: string = `${environment.ticAPI}`;
  private _dataToken!: LoginResponseToken;
  private tokenLocalStorage = 'tokenTIC';
  private loggedIn = new BehaviorSubject<boolean>(false);

  currentUser$: Observable<any>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): DataUserTic {
    return this.currentUserSubject.value;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get dataToken(){
    return {...this._dataToken};
  }

  constructor(private http: HttpClient, private router: Router) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }


  getDataUserTic(): Observable<DataUserTic>{
    const url = `${this.apiTIC}/auth/user`;
    const cabecera = new HttpHeaders()
            .set('Accept','application/json')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization','Bearer '+ this.getTokenFromLocalStorage());
            this.isLoadingSubject.next(true);
    return this.http.get<DataUserTic>(url, { headers: cabecera}).pipe(
      map( (user) =>{
        if(user){
          this.currentUserSubject.next(user);
        }else{
          this.logout()
        }
        return user
      }),
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  // public methods
  login(rut: string, password: string){
    this.loggedIn.next(true)
    // ? se realiza peticion a la API del TIC enviando los datos requeridos para obtener token del funcionario.
    const url = `${ this.apiTIC }/auth/login`;
    const body = {rut, password}
    return this.http.post<LoginResponseToken>(url , body)
      .pipe(
        tap( response => {
          //console.log('login auth',response)
          if(response.success){
            const resultToken = this.setTokenFromLocalStorage(response)
            this.getDataUserTic()
            this._dataToken = {
              success:{
                access_token: response.success.access_token!,
                token_type: response.success.token_type!,
                expires_at: new Date(response.success.expires_at!)
              }
            }
            //console.log('resultToken',resultToken)
            return resultToken
          }
        }),
        map( resp => {
          if(resp.success){
            return true
          }
        }),
        catchError(err => of(err)),
        finalize( () => this.loggedIn.next(false))
      )
  }

  logout() {
    localStorage.clear()
    localStorage.removeItem(this.tokenLocalStorage);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }


  //? Verifica que el token del TIC aun exista en el localStorage "tokenTIC" , se usa en el authGuard, en caso de que no exista, se cierra la session y manda al usuario al login.
  validarToken(): Observable<boolean>{
    const url = `${this.apiTIC}/auth/validate-token`;
    const cabecera = new HttpHeaders()
            .set('Accept','application/json')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization','Bearer '+ this.getTokenFromLocalStorage());
    return this.http.get(url, {headers: cabecera})
            .pipe(
              map( resp => {
                //console.log('validarToken',resp)
                return true
              }),
              catchError(err => of(false))
            )
  }



  private setTokenFromLocalStorage(token: LoginResponseToken): boolean {
    if(token){
      localStorage.setItem(this.tokenLocalStorage, JSON.stringify(token.success.access_token))
      return true
    }
    return false
  }

  private getTokenFromLocalStorage(){
    try{
      const valor = localStorage.getItem(this.tokenLocalStorage)
      if(!valor){
        return undefined
      }
      const token = JSON.parse(valor);
      return token;
    }catch (error){
      console.log(error)
      return undefined
    }
  }
}
