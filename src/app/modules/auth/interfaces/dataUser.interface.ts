export interface DataUserTic {
    success: Success;
}

interface Success {
    photo: string;
    user:  Usuario;
}

export interface Usuario {
    codigo_dotacion:      string;
    dotacion:             string;
    codigo_escalafon:     string;
    escalafon:            string;
    codigo_grado:         string;
    grado:                string;
    apellido_paterno:     string;
    apellido_materno:     string;
    primer_nombre:        string;
    segundo_nombre:       string;
    codigo_funcionario:   string;
    correo_particular:    string;
    correo_institucional: string;
    rut:                  string;
    user_type_id:         string;
    password_changed_at:  Date;
    password_expiration:  number;
}
