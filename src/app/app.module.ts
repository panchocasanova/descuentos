import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BnNgIdleModule } from 'bn-ng-idle';
import { ToastrModule } from 'ngx-toastr';

//import { AuthService } from './modules/auth/services/auth.service';
//import { environment } from 'src/environments/environment';


/* function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
} */

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    BnNgIdleModule
    //{
      //provide: APP_INITIALIZER,
      //useFactory: appInitializer,
      //multi: true,
      //deps: [AuthService],
    //},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
