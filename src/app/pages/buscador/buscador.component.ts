import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { List } from '../buscador/interfaces/buscador-interfaces';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
})
export class BuscadorComponent implements OnInit {
  listadoFuncionarios : List[] = []
  componentChild : boolean = false

  constructor() { }

  ngOnInit(): void {

  }

  @Output() funcionariobuscador: EventEmitter<List> = new EventEmitter<List>

  funcionario_seleccionado: List
  seleccionadoRut(event: List){
    if(event){
      this.funcionario_seleccionado = event
      this.funcionariobuscador.emit(event)
      this.componentChild = false
      //this.componenteHijo = false
      }
  }

  recibirListado(event: List[]){
    this.listadoFuncionarios = event
    //console.log('Buscador listado : '+this.listadoFuncionarios);
    this.componentChild = true
  }


}
