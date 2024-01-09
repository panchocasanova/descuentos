import { Component, Input } from '@angular/core';
import { List } from '../../buscador/interfaces/buscador-interfaces';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {
bla: string
@Input() funRut:any

  funcionario_seleccionado: List
  selll(event: List){
    console.log(event);

    if(event){
      this.funcionario_seleccionado = event
      console.log("asdad"+this.funcionario_seleccionado);

      //this.componenteHijo = false
      }
    }





}
