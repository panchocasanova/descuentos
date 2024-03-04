import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { perfilUsuario } from '../../interfaces/general';
import { Ingreso } from '../interfaces/descuentos';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DescuentosService } from '../services/descuentos.service';
import { detalleIngreso } from '../../buscador/interfaces/buscador-interfaces';
import Swal from 'sweetalert2';
import { GeneralService } from '../../services/general.service';

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
  reparticion: any


  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private descuentoService: DescuentosService,
    private generalService: GeneralService,
    private router: Router,
    private cdr: ChangeDetectorRef
    ){
    this.formValidacion = this.fb.group({
      checkArray: this.fb.array([], Validators.required)
    })
  }

  ngOnInit() {
    this.dataIngresos()
    this.rep()
  }

  rep(){
    this.generalService.reparticionUsuario().subscribe({
      next: (data) =>{
        //console.log(data);
        this.reparticion = data

      }
    })
  }

  dataIngresos(){
    this.route.data.subscribe(({ing}) =>{
      this.ingresos = ing.ingresos
     this.ingresos.map(response =>{
      response.checked = false
     })
     console.log(this.ingresos);

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

  actualizarIngresos(){
    //this.ingresos = []
    this.descuentoService.buscarIngresos(this.reparticion).subscribe((response) =>{
      this.ingresos = response.ingresos
      console.log(this.ingresos);
      this.cdr.detectChanges();

    })
  }



  submitFormValidacion(){
    //console.log(this.formValidacion)
    Swal.fire({
      title: "¿Está seguro que desea validar los ingresos seleccionados?",
      text: "Quedará un registro de la persona que valida cada ingreso.",
      icon: "warning",
      width: 850,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, validar!",
      cancelButtonText: "No estoy seguro(a)."
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(this.reparticion);
        //console.log(this.formValidacion);
        this.descuentoService.postValidacion(this.formValidacion).subscribe({
          next: (result) =>{
            console.log(result);
            this.actualizarIngresos()

            Swal.fire({
              title: "Validados!",
              text: "Los ingresos han sido validados satisfactoriamente.",
              icon: "success"
            });
            this.vaciarArray()

          },
          error: (err) =>{
            console.log(err);
          }
        })


      }
    });

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
              if(ingreso.checked != true){
                ingreso.checked = true
                const checkArray: FormArray = this.formValidacion.get('checkArray') as FormArray
                checkArray.push(new FormControl(Number(event.target.value)))
              }

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

  vaciarArray(){
    const checkArray: FormArray = this.formValidacion.get('checkArray') as FormArray
        while (checkArray.length !==0){
          checkArray.removeAt(0)
        }
  }


}
