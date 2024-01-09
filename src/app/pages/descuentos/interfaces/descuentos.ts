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
