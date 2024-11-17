import { Address, EmergencyDetails, Owner } from "@prisma/client";
import { PrismaErrorHandler } from "./prismaErrorHandler.js";
import { CustomGenericResponse } from "./responses.js";

export interface PrismaOwnerData extends Owner {
  address?: Address;
  emergencyDetails?: EmergencyDetails;
}

export interface OwnerGetResponse extends CustomGenericResponse {
  owner: PrismaOwnerData;
}

export type ApiResponse<T> = T | PrismaErrorHandler;

export type IOwnerGet = ApiResponse<OwnerGetResponse>;
