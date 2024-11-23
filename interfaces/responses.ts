export interface CustomResponse {
  status: number;
  message?: string;
  error?: string;
  field?: unknown;
}

export interface CustomGenericResponse {
  status: number;
  error: string;
}
