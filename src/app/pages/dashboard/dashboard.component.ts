import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Perfil, perfilUsuario } from 'src/app/pages/interfaces/general';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private generalService: GeneralService,
    private route: ActivatedRoute) {}

  perfil: perfilUsuario
  funcion : string
  dataCargos: any = []
  dataMesada: any = []
  admin: boolean = false
  opcionesSitio :Perfil[] = []
  opcionCargo: Perfil[] = []
  opcionDescuentos: Perfil[] = []


  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) =>{
        //console.log(data.perfil);
        if(data.perfil[0].rut === '14174626'){
          this.admin = true
          this.opcionDescuentos = data.perfil
        }
        //this.dataCargos = data.perfil.filter((sistema:any) => sistema.id_sistema === 'CAR')
        //this.dataMesada = data.perfil.filter((sistema:any) => sistema.id_sistema === 'MES')
      }
    })
    //this.misSistemas()
  }

  misSistemas(){
    this.generalService.usuario().subscribe( data =>{
      this.perfil = data
      console.log(this.perfil);

      if(this.perfil.funcionario[0].id_rut == '14174626'){
        this.admin = true
      }
      //this.dataCargos = this.perfil.perfil.filter(sistema => sistema.id_sistema == 'CAR')
      //console.log(this.dataCargos);
      //this.dataMesada = this.perfil.perfil.filter(sistema => sistema.id_sistema == 'MES')
      //console.log(this.dataMesada);

      /* if(this.dataCargos[0].id_sistema == 'CAR'){
        console.error("sdfsd")
        console.warn("asdasd")
        console.info(2)
      } */
      //console.info(this.perfil.perfil)
      for (let index = 0; index < this.perfil.perfil.length; index++) {
        const element = this.perfil.perfil[index];
        if (element.id_sistema === 'CAR' || element.id_sistema === 'MES'){
          //console.info(element.id_sistema)

          this.generalService.buscarOpcionesSitio(element.id_sistema).subscribe({
            next: (data: Perfil[]) =>{
              //console.log(data);
              this.opcionesSitio = this.opcionesSitio.concat(data)
              this.opcionCargo = this.opcionesSitio.filter(sistema => sistema.id_sistema === 'CAR')

            },
            error: (err) =>{
              console.log(err);
            }
          })
        }
      }
    })


  }


}
