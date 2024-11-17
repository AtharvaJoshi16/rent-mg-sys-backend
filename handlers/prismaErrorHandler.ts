import { Prisma } from "@prisma/client";
import { prismaErrorCodes } from "../constants/errorCodes.js";
import { errors } from "../constants/errors.js";

export const prismaErrorHandler = (e: Error) => {
  const {
    UNIQUE_CONSTRAINT,
    TRANSACTION_TIMEOUT,
    DB_REQUEST_TIMEOUT,
    DB_UNREACHABLE,
  } = prismaErrorCodes;

  const {
    UNIQUE_CONTRAINT: UNIQUE_CONSTRAINT_MSG,
    SERVER_UNREACHABLE,
    REQUEST_TIMEOUT,
    INTERNAL_SERVER_ERROR,
    INITIALIZATION_ERROR,
    DATA_VALIDATION_ERROR,
  } = errors;
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    switch (e.code) {
      case UNIQUE_CONSTRAINT:
        return {
          status: 400,
          error: e.message,
          field: `${e.meta?.modelName}: ${e.meta?.target}`,
        };
      case DB_UNREACHABLE:
        return {
          status: 503,
          error: SERVER_UNREACHABLE,
          field: `${e.meta?.modelName}: ${e.meta?.target}`,
        };
      case TRANSACTION_TIMEOUT:
        return {
          status: 408,
          error: REQUEST_TIMEOUT,
        };
      case DB_REQUEST_TIMEOUT:
        return {
          status: 408,
          error: REQUEST_TIMEOUT,
          field: `${e.meta?.modelName}: ${e.meta?.target}`,
        };
      default:
        return {
          status: 500,
          error: INTERNAL_SERVER_ERROR,
          field: `${e.meta?.modelName}: ${e.meta?.target}`,
        };
    }
  }
  if (e instanceof Prisma.PrismaClientValidationError) {
    return {
      status: 400,
      error: DATA_VALIDATION_ERROR,
    };
  }
  if (e instanceof Prisma.PrismaClientInitializationError) {
    return {
      status: 500,
      error: INITIALIZATION_ERROR,
    };
  }
  return {
    status: 500,
    error: INTERNAL_SERVER_ERROR,
  };
};
