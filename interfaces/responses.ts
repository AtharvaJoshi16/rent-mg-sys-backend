export interface CustomCreateResponse {
  status: number;
  message?: string;
  error?: string;
  field?: unknown;
}

export interface CustomGenericResponse {
  status: number;
  error: string;
}
