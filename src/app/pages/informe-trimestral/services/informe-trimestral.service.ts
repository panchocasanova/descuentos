import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mes } from '../informe-trimestral';

@Injectable({
  providedIn: 'root'
})
export class InformeTrimestralService {
  private apiRemune: string = `${environment.remuneAPI}`;
  private tokenLocalStorageRemune = 'tokenRemune';

  constructor(private http: HttpClient) { }

  getInforme(form?:FormGroup) {
    let mes = ''
    const url = `${this.apiRemune}/generarInformeTrimestral`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS());

      if (form?.value.mes <= 9) {
        mes = "0" + form?.value.mes
      } else {
        mes = form?.value.mes
      }
    const fecha = form?.value.anno + mes

    const params = new HttpParams()
    .append('anno', form?.value.anno)
    .append('mes', mes)
    .append('fecha', fecha)

    return this.http.post(url, "",{headers, responseType: 'blob', params})
  }

  getAnnosAll(): Observable<any>{
    const url = `${this.apiRemune}/all_anos_institucionales`;
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
    return this.http.get<any>(url,{headers})
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

  private _meses: Mes[] = [
    { id: 1, descripcion: 'Enero' },
    { id: 2, descripcion: 'Febrero' },
    { id: 3, descripcion: 'Marzo' },
    { id: 4, descripcion: 'Abril' },
    { id: 5, descripcion: 'Mayo' },
    { id: 6, descripcion: 'Junio' },
    { id: 7, descripcion: 'Julio' },
    { id: 8, descripcion: 'Agosto' },
    { id: 9, descripcion: 'Septiembre' },
    { id: 10, descripcion: 'Octubre' },
    { id: 11, descripcion: 'Noviembre' },
    { id: 12, descripcion: 'Diciembre' },
  ];

  get meses() {
    return this._meses;
  }
}


