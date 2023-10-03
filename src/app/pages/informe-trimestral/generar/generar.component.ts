import { Component, OnInit } from '@angular/core';
import { InformeTrimestralService } from '../services/informe-trimestral.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Mes } from '../informe-trimestral';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styles: [
  ]
})
export class GenerarComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private informeService: InformeTrimestralService,
    private fb: FormBuilder) { }
  annos:any
  mesesdelanno: Mes[] = [];
  dateobj = new Date()
  mesActual = this.dateobj.getUTCMonth() + 1
  isLoading: boolean = false
  formInforme: FormGroup = this.fb.group({
    mes: ['', Validators.required],
    anno: ['', Validators.required]
  })



  ngOnInit() {
    this.annos = this.route.snapshot.data.annos;
    this.mesesdelanno = this.informeService.meses
  }

  generarInforme() {
    // this.isLoading = true
    let timerInterval: any
    Swal.fire({
      icon: 'info',
      title: 'Procesando archivo',
      html: 'El archivo se esta procesando, espere un momento por favor',
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      },
      allowOutsideClick: false
    })
    this.informeService.getInforme(this.formInforme).subscribe({
      next: (resp) => {
        //this.isLoading = false
        const blob = new Blob([resp], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'InformeTrimestral.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        //window.open(url);
        Swal.close();
        this.formInforme.reset()
      },
      error: (err) => {
        console.error(err);

        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error al generar el informe',
        })
        //this.isLoading = false
        this.formInforme.reset()
      }
    })
  }
}
