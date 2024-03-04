import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescuentosService {
  private apiRemune: string = `${environment.remuneAPI}`;
  private tokenLocalStorageRemune = 'tokenRemune';

  private isVisible = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisible.asObservable();

  constructor(private http: HttpClient) { }


  buscarFuncionario(form?:FormGroup): Observable<any>{
    const url = `${this.apiRemune}/listar_funcionario`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
    const params = new HttpParams()
    .append('rut', form?.value.rut)
    return this.http.post<any>(url, "", { headers, params})
  }

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

  toggleVisibility() {
    this.isVisible.next(!this.isVisible.value);
  }

  buscarIngresos(reparticion: string):Observable<any>{
    //console.log(reparticion);

    const url = `${this.apiRemune}/buscar_ingresados`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
    const params = new HttpParams()
    .append('reparticion', reparticion)
    return this.http.post<any>(url, "", { headers, params})
  }


  buscarDetalleIngreso(id: string){
    const url = `${this.apiRemune}/buscar_detalle_ingreso`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
    const params = new HttpParams()
    .append('id', id)
    return this.http.post<any>(url, "", { headers, params})

  }


  postValidacion(formulario: FormGroup){

    const url = `${this.apiRemune}/validar_ingreso`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
      return this.infoUsuario().pipe(
        switchMap((response: any) => {
          console.log(response);

          const rut = response.funcionario[0].id_rut;
          //const body = { rut: rut, sitio: this.sitio };
          const params = new HttpParams()
            .append('rut', rut)
            .append('formulario',formulario.value.checkArray)
          return this.http.post(url, "", { headers, params });
        })
      );


  }
  private infoUsuario(): Observable<any> {
    const url = `${this.apiRemune}/validar_token`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      //.set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS());
    return this.http.get<any>(url, { headers });
  }
}
