import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { perfilUsuario } from 'src/app/pages/interfaces/general';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private generalService: GeneralService) {}

  perfil: perfilUsuario
  funcion : string


  ngOnInit(): void {
    this.generalService.usuario().subscribe( data =>{
      this.perfil = data
      //console.log(data);



      //console.log(this.perfil.perfil[0].dt_function.replace(' ', ''));

    } )
  }



}
