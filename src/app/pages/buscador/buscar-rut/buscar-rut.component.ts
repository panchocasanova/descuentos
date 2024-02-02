import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { buscadorService } from '../services/buscador.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { List } from '../interfaces/buscador-interfaces'

@Component({
  selector: 'app-buscar-rut',
  templateUrl: './buscar-rut.component.html',
  styles: [
  ]
})
export class BuscarRutComponent {
  formrut: FormGroup = this.fb.group({
    rut: ['', [Validators.required, Validators.pattern("^[0-9K-k]*$")]]
  })
  isLoadingAbrirBuscador: boolean = false;
  @Input() name: string = 'Abrir Buscador'

  @Output() funcionarioRut: EventEmitter<List> = new EventEmitter<List>
  modalRef: NgbModalRef;
  modalMasivas: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading3liq: boolean = false

  constructor(
    private fb: FormBuilder,
    private buscadorService : buscadorService,
    private modalService: NgbModal ){}


    buscarrut(){
      this.buscadorService.buscarFuncionario(this.formrut).subscribe({
        next: (value) => {
          this.closeModal()
          this.funcionarioRut.emit(value.lists[0])
          this.formrut.reset()
        },
        error: (err) =>{
          console.log(err.error);
          if(err.error.number === 1){
            Swal.fire({
              icon: 'error',
              title: 'Problemas con el rut ingresado',
              text: err.error.msg,
              allowOutsideClick: false
            })
            this.formrut.reset()
            this.closeModal()
          }
        }
      })
    }

    closeModal() {
      this.modalRef.close();
      this.isLoading3liq = false
      //this.formbusqueda.reset({ paterno: '', materno: '' })
      this.modalMasivas.next(false)
      this.buscadorService.toggleVisibility();

    }
    openModal(content: any) {
      //this.modalMasivas.next(true);
      this.buscadorService.toggleVisibility();
      //console.log('buscador - funcionarioLiquidacionC:',this.funcionarioLiquidacionC.getValue());
      this.modalRef = this.modalService.open(content, { backdrop: 'static', size: 'lg' });
      this.modalRef.result.then(
        () => {
          // Modal cerrado
        },
        () => {
          // Modal cerrado con descarte (dismiss)
        }
      );
    }

}
