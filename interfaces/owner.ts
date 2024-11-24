import { Address, EmergencyDetails, Owner, Renter, User } from "@prisma/client";
import { PrismaErrorHandler } from "./prismaErrorHandler.js";
import { CustomGenericResponse, CustomResponse } from "./responses.js";

export interface IOwner extends Owner {
  address?: Partial<Address>;
  emergencyDetails?: Partial<EmergencyDetails>;
}

export interface IUser extends User {
  owner?: IOwner;
  renter?: Renter;
}

export interface OwnerGetResponse extends CustomGenericResponse {
  owner: IUser;
}

export interface OwnersGetResponse extends CustomGenericResponse {
  ownersCount: number;
  owners: IUser[];
}

export interface OwnerDeleteResponse extends CustomResponse {
  affected?: {
    properties: number[];
  };
}

export type ApiResponse<T> = T | PrismaErrorHandler;

export type IOwnerGet = ApiResponse<OwnerGetResponse>;
export type IOwnersGet = ApiResponse<OwnersGetResponse>;
export type IOwnerDelete = ApiResponse<OwnerDeleteResponse>;
