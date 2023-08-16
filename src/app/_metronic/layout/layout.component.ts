import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { LayoutService } from './core/layout.service';
import { LayoutInitService } from './core/layout-init.service';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // Public variables
  selfLayout = 'default';
  asideSelfDisplay: true;
  asideMenuStatic: true;
  contentClasses = '';
  contentContainerClasses = '';
  toolbarDisplay = true;
  contentExtended: false;
  asideCSSClasses: string;
  asideHTMLAttributes: any = {};
  headerMobileClasses = '';
  headerMobileAttributes = {};
  footerDisplay: boolean;
  footerCSSClasses: string;
  headerCSSClasses: string;
  headerHTMLAttributes: any = {};
  // offcanvases
  extrasSearchOffcanvasDisplay = false;
  extrasNotificationsOffcanvasDisplay = false;
  extrasQuickActionsOffcanvasDisplay = false;
  extrasCartOffcanvasDisplay = false;
  extrasUserOffcanvasDisplay = false;
  extrasQuickPanelDisplay = false;
  extrasScrollTopDisplay = false;
  asideDisplay: boolean;
  @ViewChild('ktAside', { static: true }) ktAside: ElementRef;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  constructor(
    private initService: LayoutInitService,
    private layout: LayoutService,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private toastr: ToastrService
  ) {
    this.initService.init();
  }

  ngOnInit(): void {
    // build view by layout config settings
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.toolbarDisplay = this.layout.getProp('toolbar.display') as boolean;
    this.contentContainerClasses = this.layout.getStringCSSClasses('contentContainer');
    this.asideCSSClasses = this.layout.getStringCSSClasses('aside');
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('headerMenu');
    this.expiresession()
  }

  expiresession(){
    this.bnIdle.startWatching(60*1).subscribe((isTimedOut: boolean) => {
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

  logout() {
    localStorage.clear()
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  ngAfterViewInit(): void {
    if (this.ktHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.ktHeader.nativeElement.attributes[key] =
            this.headerHTMLAttributes[key];
        }
      }
    }
  }
}
