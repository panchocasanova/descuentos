import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { List } from '../buscador/interfaces/buscador-interfaces';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
})
export class BuscadorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  @Output() funcionarioRutbuscador: EventEmitter<List> = new EventEmitter<List>

  funcionario_seleccionado: List
  seleccionadoRut(event: List){
    if(event){
      this.funcionario_seleccionado = event
      this.funcionarioRutbuscador.emit(event)
      //this.componenteHijo = false
      }
  }
}
