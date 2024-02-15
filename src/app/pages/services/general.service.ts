import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { perfilUsuario } from '../interfaces/general';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private apiRemune: string = `${environment.remuneAPI}`;
  private tokenLocalStorageRemune = 'tokenRemune';

  constructor(private http: HttpClient) { }

  public ru: string
  subjectreparticion = new Subject<string>();

  private getTokenRemuneLS() {
    try {
      const valor = localStorage.getItem(this.tokenLocalStorageRemune);
      if (!valor) {
        return undefined;
      }
      const token = JSON.parse(valor);
      return token;
    } catch (error) {
      // console.log(error)
      return undefined;
    }
  }

  private infoUsuario(): Observable<perfilUsuario> {
    const url = `${this.apiRemune}/validar_token`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      //.set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS());
    return this.http.get<perfilUsuario>(url, { headers });
  }
  usuario(){
    return this.infoUsuario()
  }

  reparticionUsuario(){
    this.usuario().subscribe( items =>{
      this.subjectreparticion.next(items.autorizado[0].dt_repartition)
    })
    return this.subjectreparticion.asObservable()
  }
}
