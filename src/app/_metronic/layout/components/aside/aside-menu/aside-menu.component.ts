import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { GeneralService } from 'src/app/pages/services/general.service';
import { Perfil, perfilUsuario } from 'src/app/pages/interfaces/general';


@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor( private generalService: GeneralService) {}

  perfil: perfilUsuario
  opcion: string

  ngOnInit(): void {
    this.generalService.usuario().subscribe( data =>{

      this.perfil = data
      //console.log(this.perfil.perfil[0].dt_function.replace(' ', ''));

    } )
  }
}
