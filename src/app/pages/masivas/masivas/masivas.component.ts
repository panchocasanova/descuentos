import { Component, OnInit, ViewChild } from '@angular/core';
import { List } from '../interfaces/masivas-interfaces';
import { MasivasService } from '../services/masivas.service';

@Component({
  selector: 'app-masivas',
  templateUrl: './masivas.component.html',
  styles: [
  ]
})
export class MasivasComponent implements OnInit {
  listadoFuncionarios: List[] = []
  funcionario_seleccionado: List
  componenteHijo: boolean = true
  componentBuscadorFLC:boolean
  isVisible: boolean = true

  ejemplobuscador: Object

  constructor(private masivaService: MasivasService){
    this.masivaService.isVisible$.subscribe((value) =>{
      this.isVisible = value
    })

  }
  ngOnInit(): void {
    this.datauser()
  }

  datauser() {
    this.masivaService.usuario().subscribe({
      next: (value: any) => {
        for (let index = 0; index < value.datos2.length; index++){
          this.ejemplobuscador = value.datos2[index];
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  recibirListado(event: List[]){
    this.listadoFuncionarios = event
    this.componenteHijo = true
  }
  seleccionado(event: List){
    if(event){
      this.funcionario_seleccionado = event
      this.componenteHijo = false
      }
    }
  }
