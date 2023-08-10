export interface loginForm {
    rut: string;
    password: string;
}

export interface LoginResponseToken {
    success: Success;
}

export interface Success {
    access_token: string;
    token_type:   string;
    expires_at:   Date;
}

export interface ErrorsLoginResponse {
    headers:    Headers;
    status:     number;
    statusText: string;
    url:        string;
    ok:         boolean;
    name:       string;
    message:    string;
    error:      Error;
}

export interface Error {
    errors: Errors;
}

export interface Errors {
    rut: string;
}

export interface Headers {
    normalizedNames: NormalizedNames;
    lazyUpdate:      null;
}

export interface NormalizedNames {
}

