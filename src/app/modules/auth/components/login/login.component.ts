import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { loginForm } from '../../interfaces/login.interface';
import { AuthTicService } from '../../services/auth-tic.service';
import { AuthRemuneService } from '../../services/auth-remune.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: loginForm = {
    rut: '',
    password: '',
  };
  loginForm: UntypedFormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$!: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    //private authService: AuthService,
    private authTicService: AuthTicService,
    private AuthRemuneService: AuthRemuneService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.hasError = false
  }

  Alert(icons: any, title: string, text: string) {
    Swal.fire({
      icon: icons,
      title: title,
      text: text
    })
  }

  ngOnInit(): void {
    this.authTicService.logout()
    this.isLoading$ = this.authTicService.isLoggedIn;
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      rut: [
        this.defaultAuth.rut,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {

    this.hasError = false;
    const {rut, password } = this.loginForm.value
    this.authTicService.login( rut, password).subscribe({
      next: (data) => {
        //console.log('submitlogin',data)
        if(data === true){
          //let ip = document.location.hostname
          this.AuthRemuneService.loginRemune(rut).subscribe({
            next: (data) => {
              //console.log('tokenRemune',data)
              this.router.navigate([this.returnUrl])
            },
            error: (err) =>{
              console.log(err)
              if(err.statusText){
                //console.log()
                this.Alert('error','Error', err.statusText)
              }else{
                this.Alert('info','Informacion', err.error.msg)
              }
              this.authTicService.logout()
            }
          })
          //TODO: Validar en esta parte despues de saber si el usuario esta registrado en TIC
          //TODO: SI tambien esta registrado en BD_PERFIL
          //TODO: y mostrar los errores correspondientes con sweetalert
          // TODO: Revisar como funciona this.isLoading para implementarlo.
          // TODO: solo hace cargar un container con efecto en el boton despues de pulsar el submit.

        }
        if(data.error){
          //this.hasError = true
          this.loginForm.reset()
          if(data.error.errors.rut ){
            this.Alert('error','Informacion', data.error.errors.rut)
          }else if(data.error.message){
            this.Alert('error','Error', data.error.message)
          }else{
            this.Alert('error','Error ', data.error)
          }
        }
      },
      error: (err) => {
        console.log('Error',err)
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
