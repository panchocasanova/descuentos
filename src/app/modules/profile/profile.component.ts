import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUserTic } from '../auth/interfaces/dataUser.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  images: any
  user$: Observable<DataUserTic>
  constructor(private auth: AuthService, private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    //this.user$ = this.auth.currentUserSubject.asObservable();
    //this.getCurrent()
    this.auth.currentUserSubject.asObservable()
    .subscribe({
      next: (data) => {
        console.log(data)
        this.images = this.sanitizer.bypassSecurityTrustResourceUrl(data.success.photo)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // getCurrent(){
  //   this.auth.currentUser$.subscribe({
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
