import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { List, descuento } from '../../buscador/interfaces/buscador-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { buscadorService } from '../../buscador/services/buscador.service';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: []
})
export class AgregarComponent  implements OnInit, AfterViewInit{
  @Input() funcionario:List
  fechas: string | null
  descuentos : any
  descuentos$: Observable<descuento>;
  contador = 0
  archivo: File | null = null;
  fileMax: number = (1024*1024) * 3
  textoPredeterminado: string = "Lorem ipsum dolor sit cuchuflí barquillo bacán jote gamba listeilor po cahuín, luca melón con vino pichanga coscacho ni ahí peinar la muñeca chuchada al chancho achoclonar. Chorrocientos pituto ubicatex huevo duro bolsero cachureo el hoyo del queque en cana huevón el año del loly hacerla corta impeque de miedo quilterry la raja longi ñecla. Hilo curado rayuela carrete quina guagua lorea piola ni ahí."
  minDate: string


  @ViewChild('archivoup') archivoup: ElementRef;
  @ViewChild('obs') obs: any;
  ngOnInit() {
    this.descuentos$ = this.buscadorService.listadoDescuentos();

  }

  ngAfterViewInit() {
    /*
    // solo para completar el comentario para pruebas.
    this.obs.nativeElement.value = this.textoPredeterminado;
    */
  }


  constructor(private fb: FormBuilder,
            private buscadorService: buscadorService,
           ){
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1
            this.minDate = `${year}-${month < 10 ? '0' + month : month}`;
           }




  formIngresoDescuento: FormGroup = this.fb.group({
    fechaDesde: ['', [Validators.required]],
    fechaHasta: ['', [Validators.required]],
    cod_descuento: ['', [Validators.required]],
    monto: ['', [Validators.required, Validators.min(1), Validators.max(999999), Validators.maxLength(6)]],
    observaciones:['', Validators.maxLength(1000)],

  },{
    validators: this.fechaMenor('fechaDesde','fechaHasta')
  })


  fechaMenor(fechaDesde: string, fechaHasta: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let inicio = group.controls[fechaDesde];
      let fin = group.controls[fechaHasta];
      if (inicio.value > fin.value) {
        return {
          fechas: "La fecha de inicio debe ser menor que la fecha de fin"
        };
      }
      return {};
    }
  }

  onChange(event: any) {
    this.archivo = event.target.files[0];
    if (this.archivo) {
      if(this.archivo.size > this.fileMax){
        //console.log("el archivo supera el maximo");
        Swal.fire({
          title: "Archivo excede el máximo",
          html: "El archivo debe tener un maximo de 3MB <small>(3145728 Bytes)</small>",
          icon: "info",
          width: 600
        })
        this.clearSelectedFile()
      }else if(this.archivo.type !== 'application/pdf'){
        //Limpiar input
        //console.log("No es un archivo PDF.");
        Swal.fire({
          title: "Archivo no válido",
          text: "El archivo debe estar en formato PDF",
          icon: "info"
        })
        this.clearSelectedFile()
      }else{
        console.log(this.archivo)
        this.formIngresoDescuento.addControl('archivoDescuento', this.fb.control(this.archivo))
      }
    }
  }

  clearSelectedFile() {
    this.archivoup.nativeElement.value = null;
  }

  fechaFormatoValido(control: any) {
    const fechaRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    if (control.value && !fechaRegex.test(control.value)) {
      return { formatoInvalido: true };
    }
    return null;
  }

  lDescuentos(){
    this.buscadorService.listadoDescuentos().subscribe({
      next: (value) =>{
        this.descuentos = value.listado
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  caracteres(event: any){
    this.contador = event.target.value.length
   }

   procesarIngreso(){
    //console.log(this.formIngresoDescuento);
    console.log(this.funcionario);

    Swal.fire({
      title: "¿Esta seguro que desea agregar este descuento?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Salir`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if(this.funcionario.rut){
          //console.log("rutSeleccionado: ", this.funcionario.rut);
          this.formIngresoDescuento.addControl('rutSeleccionado', this.fb.control(this.funcionario.rut))
        }else{
          Swal.fire({
            icon:"error",
            title:"Error 001",
            text:"No es posible realizar la solicitud"
          })
          this.formIngresoDescuento.removeControl('rutSeleccionado')
          this.formIngresoDescuento.removeControl('archivoDescuento')
          this.formIngresoDescuento.reset()
          return false
        }
        let usuario: any
        this.buscadorService.usuario().pipe(
          tap( n =>{
            //console.log("Valor n: ", n)
            usuario = n
            //console.log(usuario.autorizado[0].id_rut);
            this.formIngresoDescuento.addControl('rutFuncionario', this.fb.control(usuario.autorizado[0].id_rut))
            this.buscadorService.cargarIngresoDescuento(this.formIngresoDescuento).subscribe({
              next(value) {
                console.log(value);
                Swal.fire("Ingreso guardado exitosamente!","","success")

              },
              error(err) {
                Swal.fire({
                  icon:"error",
                  title:"Problema al ingresar",
                  text: err
                })

              },
            })
          })
        ).subscribe();
      } else if (result.isDenied) {
        Swal.fire("El ingreso no será guardado", "", "info");
      }
    });


  }
}

    //this.formIngresoDescuento.addControl('rutFuncionario', this.fb.group(this.funcionario.rut))
   /*  this.buscadorService.usuario().subscribe({
      next(value:any ) {
        console.log("rutFuncionarioIngreso: ",value.autorizado[0].id_rut);
        if (value.autorizado[0].id_rut){
          rutFuncionarioIngreso = value.autorizado[0].id_rut
        }
      },
      error(err) {
        console.log(err);
      },
    }) */






