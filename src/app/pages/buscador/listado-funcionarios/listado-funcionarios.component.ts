import { Component, EventEmitter, Input, Output } from '@angular/core';
import { List } from '../interfaces/buscador-interfaces';

@Component({
  selector: 'app-listado-funcionarios',
  templateUrl: './listado-funcionarios.component.html',
  styles: [
  ]
})
export class ListadoFuncionariosComponent {
  @Input() listadoPadre: List[]
  page = 1
  pageSize = 10
  @Output() funcionarioSeleccionado: EventEmitter<List> = new EventEmitter<List>()

  formListado(value: List){
    console.log('Ckeckbox list', value);
    this.funcionarioSeleccionado.emit(value)
  }

}
