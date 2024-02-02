import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { buscadorService } from '../services/buscador.service';
import { List } from '../interfaces/buscador-interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-apellido',
  templateUrl: './buscar-apellido.component.html',
  styles: [
  ]
})
export class BuscarApellidoComponent implements OnInit {
  isLoadingAbrirBuscador: boolean = false;
  isLoading3liq: boolean = false
  modalRef: NgbModalRef;
  @Input() name: string = 'Abrir Buscador'
  modalMasivas: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formbusqueda: FormGroup = this.fb.group({
    paterno: ['', [Validators.nullValidator, Validators.minLength(4)]],
    materno: ['', [Validators.nullValidator, Validators.minLength(4)]]
  })




  //funcionarios: BehaviorSubject<List[]> = new BehaviorSubject<List[]>([])
  @Output() funcionarios: EventEmitter<List[]> = new EventEmitter<List[]>()

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private BuscadorService: buscadorService) { }

  ngOnInit(): void {


  }



  buscaralgo() {
    this.isLoading3liq = true
    this.BuscadorService.getFuncionarios(this.formbusqueda)?.subscribe({
      next: (value) => {
        if (value.status = 200) {
          this.funcionarios.emit(value.lists)
          this.isLoading3liq = false
          this.closeModal()
        }
      },
      error: (err) => {
        this.isLoading3liq = false
        this.closeModal()
        console.log(err.error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
          footer: 'Carabineros de Chile - Departamento Remuneraciones P.9'
        })
      }
    })
  }

  openModal(content: any) {
    this.modalMasivas.next(true);
    this.BuscadorService.toggleVisibility();

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
    this.formbusqueda.reset({ paterno: '', materno: '' })
    this.modalMasivas.next(false)
    this.BuscadorService.toggleVisibility();

  }

}
