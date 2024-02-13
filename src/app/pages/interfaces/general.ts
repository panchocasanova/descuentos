export interface Perfil {
  dt_acceso_alto_mando:  string;
  dt_filtro:             string;
  dt_function:           string;
  dt_grado:              string;
  dt_multi_dotacion:     string;
  dt_repartition_centra: string;
  dt_repartition_desde:  string;
  dt_repartition_hasta:  string;
  dt_super_usuario:      string;
  id_option:             string;
  id_sistema:            string;
  id_ucf:                string;
  rut:                   string;
}

export interface Autorizado {
  dt_activo:       string;
  dt_activo_2:     string;
  dt_cargo:        string;
  dt_clave:        string;
  dt_control_liq:  string;
  dt_correo:       string;
  dt_digito:       string;
  dt_fecha_expira: string;
  dt_fecha_hoy:    string;
  dt_glosa:        string;
  dt_nombre:       string;
  dt_repartition:  string;
  dt_restriction:  string;
  id_rut:          string;
}

export interface Funcionario {
  cod_funcionario1: string;
  dt_cod:           string;
  dt_digito:        string;
  dt_letra:         string;
  estado_civil:     string;
  fecha_ingreso:    string;
  fecha_nacimiento: string;
  fecha_retiro:     string;
  id_rut:           string;
  materno:          string;
  nombre:           string;
  nombre2:          string;
  paterno:          string;
  sexo:             string;
}


export interface perfilUsuario {
  autorizado:  Autorizado[];
  funcionario: Funcionario[];
  perfil:      Perfil[];
}
