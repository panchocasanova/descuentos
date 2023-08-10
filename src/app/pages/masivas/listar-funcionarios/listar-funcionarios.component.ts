import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from '../interfaces/masivas-interfaces';


@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styles: [
  ]
})
export class ListarFuncionariosComponent implements OnInit{
  @Input() listadoPadre: List[]
  page = 1
  pageSize = 5
  @Output() funcionarioSeleccionado: EventEmitter<List> = new EventEmitter<List>()


  constructor(){

  }
  ngOnInit(): void {
  }

  formListado(value: List){
    //console.log('Ckeckbox list', value);
    this.funcionarioSeleccionado.emit(value)
  }

}
