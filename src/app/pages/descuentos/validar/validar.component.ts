import { Component, Input, OnInit, inject } from '@angular/core';
import { perfilUsuario } from '../../interfaces/general';
import { Ingreso } from '../interfaces/descuentos';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DescuentosService } from '../services/descuentos.service';
import { detalleIngreso } from '../../buscador/interfaces/buscador-interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styles: [
  ]
})
export class ValidarComponent implements OnInit{
  private modalService = inject(NgbModal);
  closeResult = '';
  modalRef: NgbModalRef;
  perfil: perfilUsuario
  ingresos: Ingreso[] = []
  formValidacion: FormGroup
  detalle: detalleIngreso[] = []


  constructor(private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private descuentoService: DescuentosService
    ){
    this.formValidacion = this.fb.group({
      checkArray: this.fb.array([], Validators.required)
    })
  }



  ngOnInit() {
    this.activateRoute.data.subscribe(({ing}) =>{
      this.ingresos = ing.ingresos
     this.ingresos.map(response =>{
      response.checked = false
     })

    })
  }

  onChangeListAll(event: any) {
    const checkArray: FormArray = this.formValidacion.get('checkArray') as FormArray
    this.ingresos.forEach((item: any) => {
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
    })
    //console.log(checkArray.value);
  }

  onChangeList(event: any) {
    console.log(event.target.value, typeof (event));

    const checkArray: FormArray = this.formValidacion.get('checkArray') as FormArray
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
    }
  }

  submitFormValidacion(){

  }

  verDetalle(event: any, m:any){
    //console.log(event.target.value);
    this.descuentoService.buscarDetalleIngreso(event.target.value).subscribe({
      next: (data) =>{
        //console.log(data);
        this.detalle = data.ingresoDetalle
        this.modalService.open(m, { backdrop: 'static', size: 'lg' }).result.then(
          (result) => {
            this.closeResult = `${result}`;
            //console.log(this.closeResult);
            const ingreso = this.ingresos.find(ingreso => ingreso.id === parseInt(this.closeResult))
            if(ingreso){
              //console.log(ingreso);
              ingreso.checked = true
              const checkArray: FormArray = this.formValidacion.get('checkArray') as FormArray
              checkArray.push(new FormControl(Number(event.target.value)))
            }
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            //console.log(this.closeResult);
          },
        )

      },
      error: (err) =>{
        console.log(err);

      }
    })




  }

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}


}
