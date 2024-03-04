import { Component, EventEmitter, Output } from '@angular/core';
import { List } from '../../buscador/interfaces/buscador-interfaces';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
  ]
})
export class PrincipalComponent {

  @Output() principalRut: EventEmitter<List> = new EventEmitter<List>
  //@Output() ejemplo: EventEmitter<string> = new EventEmitter<string>

  funcionario_seleccionado: List
  seleccionado(event: List){
    if(event){
      this.funcionario_seleccionado = event
      this.principalRut.emit(event)
      //this.componenteHijo = false
      }
    }


}
