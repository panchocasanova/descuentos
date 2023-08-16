import { Component, Input, OnInit } from '@angular/core';
import { AnnosResponse, List, Mes } from '../interfaces/masivas-interfaces';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasivasService } from '../services/masivas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-funcionario-liquidacion',
  templateUrl: './funcionario-liquidacion.component.html',
  styles: [

  ]
})
export class FuncionarioLiquidacionComponent implements OnInit {

  @Input() funcionarioSeleccionado: List

  @Input() usuario: any
  isLoading:boolean = false
  model: NgbDateStruct;
  yearfin: number
  monthfin: number
  nombreusuario: string
  dateobj = new Date()
  mesActual = this.dateobj.getUTCMonth() + 1
  annoActual = this.dateobj.getUTCFullYear()
  mesesdelanno: Mes[] = [];
  annosFuncionario: AnnosResponse[] = []
  formSolicitudLiquidacion: FormGroup = this.fb.group({
    mesInicio: ['', Validators.required],
    annoInicio: ['', Validators.required],
    mesTermino: ['', Validators.required],
    annoTermino: ['', Validators.required],
    censura: ['', Validators.required]
  })

  formAnnoFuncionario: FormGroup = this.fb.group({

  })

  constructor(private fb: FormBuilder, private masivaService: MasivasService) {


  }

  ngOnInit(): void {
    //console.log('Funcionario seleccionado',this.funcionarioSeleccionado);

    this.ultimaliquidaciondisponible()
    this.mesesdelanno = this.masivaService.meses
    this.getannosactivo()
  }

  generarDocumento() {
    let timerInterval:any
    let segundos: number = 1
    let minutos: number = 0
    //this.isLoading = true
    Swal.fire({
      title: 'Generando Documento PDF',
      html: 'Espere un momento por favor...<br> <b><minutos></minutos></b>:<b><segundos></segundos></b> segundos',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen:() =>{
        const content = Swal.getHtmlContainer()
        const $ = content?.querySelector.bind(content)
        Swal.showLoading()

        timerInterval = setInterval(() => {
          segundos = segundos + 1
          if(segundos == 60){
            minutos += 1
            segundos = 0
          }
          if(minutos <= 9){
            Swal.getHtmlContainer()!.querySelector('minutos')!.textContent = '0' + String(minutos)
          }else{
            Swal.getHtmlContainer()!.querySelector('minutos')!.textContent = String(minutos)
          }

          if(segundos <= 9){
            Swal.getHtmlContainer()!.querySelector('segundos')!.textContent = '0'+String(segundos)
          }else{
            Swal.getHtmlContainer()!.querySelector('segundos')!.textContent = String(segundos)
          }


        }, 1000)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
    })
    this.formSolicitudLiquidacion.addControl('rut', this.fb.control(this.funcionarioSeleccionado.rut, Validators.required))
    //console.log(this.formSolicitudLiquidacion.value);

    this.masivaService.generarDocumento(this.formSolicitudLiquidacion).subscribe({
      next: (value) => {
        //this.isLoading = false
        //console.log(value);
        /* var file = new Blob([value], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        URL.revokeObjectURL(fileURL); */
        const blob = new Blob([value], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.formSolicitudLiquidacion.value.rut + '.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        this.formSolicitudLiquidacion.removeControl('rut')
        this.formSolicitudLiquidacion.reset()

        Swal.close()
      },
      error: (err) =>{
        //this.isLoading = false
        Swal.close()
        //console.log(err);
        if(err.error){
          Swal.fire({
            icon: 'error',
            title: err.status,
            text: err.statusText
          })
        }

        this.formSolicitudLiquidacion.removeControl('rut')
        this.formSolicitudLiquidacion.reset()

      }
    })

    //TODO: resetear formulario solicitud despues de tener respuesta.


  }

  ultimaliquidaciondisponible() {
    this.masivaService.getUltimaHabilitada().subscribe({
      next: (value) => {
        for (let index = 0; index < value.length; index++) {
          //console.log(value[index].anno, value[index].mes, value[index].mes_string );
          this.yearfin = value[index].anno
          this.monthfin = value[index].mes
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getannosactivo() {
    //console.log("buscando años")
    this.formAnnoFuncionario.addControl('rut', this.fb.control(this.funcionarioSeleccionado.rut, Validators.required))
    this.masivaService.getAnnos(this.formAnnoFuncionario).subscribe({
      next: (annos) => {
        //console.log(annos)
        this.annosFuncionario = annos
        this.formAnnoFuncionario.removeControl('rut')
      },
      error: (err) => {
        console.log(err)
        this.formAnnoFuncionario.removeControl('rut')
      }
    })
}
}
