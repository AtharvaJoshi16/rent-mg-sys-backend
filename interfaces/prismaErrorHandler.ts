import { CustomGenericResponse } from "./responses.js";

export interface PrismaErrorHandler extends CustomGenericResponse {
  field?: string;
}
