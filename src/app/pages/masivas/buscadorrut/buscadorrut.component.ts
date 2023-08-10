import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MasivasService } from '../services/masivas.service';
import { BehaviorSubject } from 'rxjs';
import { List } from '../interfaces/masivas-interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscadorrut',
  templateUrl: './buscadorrut.component.html',
  styles: [
  ]
})
export class BuscadorrutComponent {
  isLoading3liq: boolean = false
  isLoadingAbrirBuscador: boolean = false;
  @Input() name: string = 'Abrir Buscador'
  modalRef: NgbModalRef;
  modalMasivas: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  formrut: FormGroup = this.fb.group({
    rut: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
  })

  @Output() funcionarioSeleccionado: EventEmitter<List> = new EventEmitter<List>


  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private masivaService: MasivasService) { }

  openModal(content: any) {
    //this.modalMasivas.next(true);
    this.masivaService.toggleVisibility();

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

  closeModal() {
    this.modalRef.close();
    this.isLoading3liq = false
    //this.formbusqueda.reset({ paterno: '', materno: '' })
    this.modalMasivas.next(false)
    this.masivaService.toggleVisibility();

  }

  buscarrut(){
    this.masivaService.buscarFuncionario(this.formrut).subscribe({
      next: (value) => {
        this.closeModal()
        this.funcionarioSeleccionado.emit(value.datosFuncionario[0])
        this.formrut.reset()
      },
      error: (err) =>{
        console.log(err);

        if(err.error.number === 1){
          Swal.fire({
            icon: 'info',
            title: 'Rut no encontrado',
            text: err.error.msg,
            allowOutsideClick: false
          })
        }

      }
    })
  }

}
