import { Component, OnInit } from '@angular/core';
import { perfilUsuario } from '../../interfaces/general';
import { Ingreso } from '../interfaces/descuentos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styles: [
  ]
})
export class ValidarComponent implements OnInit{
  constructor(private activateRoute: ActivatedRoute){}

    perfil: perfilUsuario
    ingresos: Ingreso[] = []

  ngOnInit() {
    this.activateRoute.data.subscribe(({ing}) =>{
      this.ingresos = ing.ingresos

    })
  }

  onChangeListAll(event: any) {
    /* const checkArray: FormArray = this.form.get('checkArray') as FormArray
    this.solicitudesPendientes.forEach((item: any) => {
      if (event.target.checked == true) {
        checkArray.push(new FormControl(item.id))
      } else {
        var i = 0;
        checkArray.controls.forEach((item: any) => {
          checkArray.removeAt(i)
          i++;
        })
      }
      item.checked = event.target.checked
    }) */
    //console.log(checkArray.value);
  }

  onChangeList(event: any) {
    //console.log(event.target.value, typeof (event));

    /* const checkArray: FormArray = this.form.get('checkArray') as FormArray
    if (event.target.checked) {
      checkArray.push(new FormControl(Number(event.target.value)))
    } else {
      var i = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == event.target.value) {
          checkArray.removeAt(i)
          return
        }
        i++;
      })
    } */

  }
}
