import { Address, EmergencyDetails, Owner } from "@prisma/client";
import { PrismaErrorHandler } from "./prismaErrorHandler.js";
import { CustomGenericResponse, CustomResponse } from "./responses.js";

export interface PrismaOwnerData extends Owner {
  address?: Address;
  emergencyDetails?: EmergencyDetails;
}

export interface OwnerGetResponse extends CustomGenericResponse {
  owner: PrismaOwnerData;
}

export interface OwnerDeleteResponse extends CustomResponse {
  affected?: {
    properties: number[];
  };
}

export type ApiResponse<T> = T | PrismaErrorHandler;

export type IOwnerGet = ApiResponse<OwnerGetResponse>;
export type IOwnerDelete = ApiResponse<OwnerDeleteResponse>;
