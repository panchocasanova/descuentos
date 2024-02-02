import { Component, Input } from '@angular/core';
import { List } from '../../buscador/interfaces/buscador-interfaces';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {
@Input() funcionario:List


}
