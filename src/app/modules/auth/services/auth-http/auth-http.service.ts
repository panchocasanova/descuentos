import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
//import { AuthModel } from '../../models/auth.model';
import { LoginResponseToken } from '../../interfaces/login.interface';
import { DataUserTic  } from '../../models';
//import { accessToken, remuneLoginUser } from '../../interfaces/remuneLoginUser.interface';

const API_USERS_URL = `${environment.apiUrl}/auth`;


@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {

  
  private apiRemune = `${environment.remuneAPI}`

  constructor(private http: HttpClient) {}

//   remuneLogin(data:remuneLoginUser): Observable<accessToken>{
//     console.log(data)
//     return this.http.post<accessToken>(this.apiRemune+`/login`, data)
//         .pipe(
//             tap( resp => console.log('LOGINSERVICE', resp))
//         );
// }

  // public methods
  login(rut: string, password: string): Observable<LoginResponseToken> {
    // ? se realiza peticion API segun los datos enviados para obtener token
    return this.http.post<LoginResponseToken>('http://autentificaticapi.carabineros.cl/api/auth/login', {rut, password})    
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<DataUserTic> {
    //? Obtengo los datos del usuario desde TIC
    const cabecera = new HttpHeaders()
            .set('Accept','application/json')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization','Bearer '+ token);
        return this.http.get<DataUserTic>('http://autentificaticapi.carabineros.cl/api/auth/user',{headers: cabecera});
  }
}
