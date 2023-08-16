import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { BnNgIdleService } from 'bn-ng-idle';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private bnIdle: BnNgIdleService,
    private toastr: ToastrService

    ) {}

  ngOnInit(): void {
    this.expiresession()
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  expiresession(){
    this.bnIdle.startWatching(60*10).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        let timerInterval: any
        Swal.fire({
          icon: 'info',
          title: 'Informacion sesi&oacute;n',
          html: 'Su sesion expirar&aacute; en <b></b> segundos.',
          timer: 10000,
          timerProgressBar: true,
          footer: 'haga click, para evitar el cierre de sesion.',
          didOpen: () => {
            Swal.showLoading()
            const b: any = Swal.getHtmlContainer()!.querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = (Swal.getTimerLeft()! / 1000).toFixed(0)
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
            this.bnIdle.resetTimer()
          },
          backdrop: true
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            this.bnIdle.stopTimer()
            this.logout()
            this.toastr.warning('Su sesion ha expirado','Informacion sesion',{
              timeOut: 20000,
              progressBar: true,
              disableTimeOut: false,
              positionClass: 'toast-bottom-full-width'
            })
            // Swal.fire({
            //   icon: 'info',
            //   title: 'Sesi&oacute;n Expirada',
            //   html: 'Pasaron m&aacute;s de 5 minutos inactivo, por seguridad cerramos tu sesi&oacute;n.',

            // })
          }
        })
      }
    })
  }
}
