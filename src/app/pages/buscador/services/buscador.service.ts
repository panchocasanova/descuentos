import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionarios, Mes, descuento } from '../interfaces/buscador-interfaces';

@Injectable({
  providedIn: 'root'
})
export class buscadorService {
  private apiRemune: string = `${environment.remuneAPI}`;
  private tokenLocalStorageRemune = 'tokenRemune';

  private isVisible = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisible.asObservable();

  constructor(private http: HttpClient) { }

  getFuncionarios(form?:FormGroup): Observable<Funcionarios> | undefined{
    const url = `${this.apiRemune}/buscar_funcionarios`;
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())

    if(form){
      const params = new HttpParams()
                      .append('paterno', form.value.paterno)
                      .append('materno', form.value.materno)
      return this.http.post<Funcionarios>(url, "",{headers, params})
    }
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

  usuario(){
    return this.infoUsuario()
  }

  getAnnos(form?:FormGroup): Observable<any> {
    //console.log(form?.value);
    const url = `${this.apiRemune}/anos_institucionales`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
    if (form) {
      const params = new HttpParams()
          .append('rut', form.value.rut)

      return this.http.post(url, "", { headers, params });
    }else{
      return this.infoUsuario().pipe(
        switchMap((response: any) => {
          const rut = response.datos[0].id_rut;
          const params = new HttpParams()
            .append('rut', rut)

          //const body = { rut: rut, sitio: this.sitio };
          return this.http.post(url, "", { headers, params });
        })
      );
    }
  }

  getUltimaHabilitada(): Observable<any> {
    const url = `${this.apiRemune}/ultima-liquidacion-habilitada`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
      return this.http.get<any>(url, { headers });
  }

  private infoUsuario() {
    const url = `${this.apiRemune}/validar_token`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      //.set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS());
    return this.http.get(url, { headers });
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

  generarDocumento(form?: FormGroup):Observable<Blob>{
    const url = `${this.apiRemune}/generar_documento`;
    var authorization = 'Bearer ' + this.getTokenRemuneLS();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authorization,
      responseType: 'blob',
    });
    /* const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
      .set('responseType','blob') */
      const params = new HttpParams()
      .append('mesInicio', form?.value.mesInicio)
      .append('annoInicio', form?.value.annoInicio)
      .append('mesTermino', form?.value.mesTermino)
      .append('annoTermino', form?.value.annoTermino)
      .append('rut', form?.value.rut)
      .append('censura', form?.value.censura)
      // {responseType: 'blob' as 'json'}
    return this.http.post<Blob>(url, "", { headers, params, responseType: 'blob' as 'json' });
  }

  buscarFuncionario(form?:FormGroup): Observable<any>{
    const url = `${this.apiRemune}/buscar_funcionario`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
    const params = new HttpParams()
    .append('rut', form?.value.rut)
    return this.http.post<any>(url, "", { headers, params})
  }

 /*  listadoDescuentos(): Observable<descuento>{
    const url = `${this.apiRemune}/descuentos_habilitados`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
      return this.infoUsuario().pipe(
        switchMap((response: any) => {
          //console.log(response.autorizado[0]);
          const rut = response.autorizado[0].id_rut;
          const unidad = response.autorizado[0].dt_repartition
          const params = new HttpParams()
            .append('rut', rut)
            .append('unidad', unidad)
          //const body = { rut: rut, sitio: this.sitio };
          return this.http.post<descuento>(url, "", { headers, params });

        })
      );
  }
 */

  listadoDescuentos(): Observable<descuento> {
    const url = `${this.apiRemune}/descuentos_habilitados`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getTokenRemuneLS());

    return this.infoUsuario().pipe(
      switchMap((response: any) => {
        const rut = response.autorizado[0].id_rut;
        const unidad = response.autorizado[0].dt_repartition;
        const params = new HttpParams()
          .append('rut', rut)
          .append('unidad', unidad);

          return this.http.post<descuento>(url, "", { headers, params }).pipe(
            //tap((data) => console.log('Respuesta HTTP:', data)),
            catchError((error) => {
              console.error('Error en la solicitud HTTP:', error);
              return [];
            })
          );
      })
    );
  }

  public cargarIngresoDescuento(form: FormGroup){
    const url = `${this.apiRemune}/cargar_ingreso`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.getTokenRemuneLS())
    console.log(form);

    /* const params = new HttpParams()
    .append('fechaDesde', form.value.fechaDesde)
    .append('fechaHasta', form.value.fechaHasta)
    .append('descuento', form.value.descuento)
    .append('monto', form.value.monto)
    .append('observaciones', form.value.observaciones)
    .append('archivoDescuento', form.value.archivoDescuento, form.value.archivoDescuento.name) */
    let formParams = new FormData();
    formParams.append('fechaDesde', form.value.fechaDesde)
    formParams.append('fechaHasta', form.value.fechaHasta)
    formParams.append('cod_descuento', form.value.cod_descuento)
    formParams.append('monto', form.value.monto)
    formParams.append('observaciones', form.value.observaciones)
    if(form.value.archivoDescuento){
      formParams.append('archivoDescuento', form.value.archivoDescuento, form.value.archivoDescuento.name)
    }
    formParams.append('rutSeleccionado', form.value.rutSeleccionado)
    formParams.append('rutFuncionario', form.value.rutFuncionario)

    return this.http.post(url, formParams, {headers})

    //let formParams = new FormData();
  }

}
