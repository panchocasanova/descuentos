export interface Funcionarios {
  description: string;
  lists:       List[];
  status:      number;
}

export interface List {
  civil:      string;
  codigo:     string;
  digito:     string;
  ingreso:    string;
  letra:      string;
  materno:    string;
  nacimiento: string;
  nombre1:    string;
  nombre2:    string;
  paterno:    string;
  retiro:     string;
  rut:        string;
  sexo:       string;
}

export interface Mes {
  descripcion: string;
  id:          number;
}

export interface AnnosResponse {
  id: number;
}

export interface descuento {
  description: string;
  listado:     listDescuento[];
  status:      number;
}

export interface listDescuento {
  codigo:     string;
  descripcion: string;
  letra:      string;
  ucf:        string;
  unidad:     string;
}

export interface detalleIngreso {
  desde:              string;
  fechaIngreso:       string;
  hasta:              string;
  id:                 number;
  idConcepto:         string;
  idEstado:           number;
  idOrigen:           number;
  ipIngreso:          string;
  monto:              number;
  nombreConcepto:     string;
  nombreFull:         string;
  nombreIngreso:      string;
  obs:                string;
  reparticionIngreso: string;
  rut:                string;
  rutIngreso:         string;
  ucfIngreso:         string;
  url:                string;
}

