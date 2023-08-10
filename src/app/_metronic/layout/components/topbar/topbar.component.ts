import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { AuthTicService } from 'src/app/modules/auth/services/auth-tic.service';
import { DataUserTic, Usuario } from 'src/app/modules/auth/interfaces/dataUser.interface';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  user$: Observable<DataUserTic>;
  images: any;
  userTic: Usuario

  datauser$ : Observable<DataUserTic>;
  

  constructor(private layout: LayoutService, private AuthService: AuthTicService, private sanitizer: DomSanitizer) {
    this.datauser$ = this.AuthService.currentUserSubject.asObservable()
  }

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
    //this.user$ = this.AuthService.getDataUserTic()
    //this.imagesUser()
    this.datauser$.subscribe({
      next: (data: DataUserTic) =>{
        //console.log('topbar',data)
        if(data !== undefined){
          this.userTic = data.success.user
          this.images = this.sanitizer.bypassSecurityTrustResourceUrl(data.success.photo)
        }       
      }
    })
  }

  imagesUser(){
    this.user$.subscribe({
      next: (data) => {
        return this.sanitizer.bypassSecurityTrustResourceUrl(data.success.photo)
      },
      error: (err) => {
        console.log(err)
        //this.AuthService.logout()
      }
    })
  }

  // getCurrent(){
  //   this.AuthService.currentUser$.subscribe({
  //     next: (data) => {
  //       //console.log(data)
  //       this.images = this.sanitizer.bypassSecurityTrustResourceUrl(data.success.photo)
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
}
