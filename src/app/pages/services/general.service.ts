import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Perfil, perfilUsuario } from '../interfaces/general';
import { ParseSourceFile } from '@angular/compiler';

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
  buscarOpcionesSitio(sitio:string){
    const url = `${this.apiRemune}/buscar_opciones_sitio`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS());
    return this.infoUsuario().pipe(
      switchMap((response: any) => {
        const rut = response.autorizado[0].id_rut;
        //const unidad = response.autorizado[0].dt_repartition;
        const params = new HttpParams()
          .append('rut', rut)
          .append('sitio', sitio);
          return this.http.post<Perfil[]>(url, "", { headers, params }).pipe(
            //tap((data) => console.log('Respuesta HTTP:', data)),
            catchError((error) => {
              console.error('Error en la solicitud HTTP:', error);
              return [];
            })
          );
      })
    );

  }
}
