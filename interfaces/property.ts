import { Address, Owner, Property, Renter, RoomDetails } from "@prisma/client";
import { CustomGenericResponse } from "./responses.js";

export interface IProperty extends Property {
  owner?: Partial<Owner>;
  renters?: Partial<Renter>[];
  address?: Partial<Address>;
  roomDetails?: Partial<RoomDetails>;
}

export interface PropertiesGetResponse extends CustomGenericResponse {
  propertyCount: number;
  properties: IProperty[];
}

export interface PropertyGetResponse extends CustomGenericResponse {
  property: IProperty;
}
