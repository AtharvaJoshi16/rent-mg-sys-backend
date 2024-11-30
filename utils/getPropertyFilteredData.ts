import { IProperty } from "../interfaces/property.js";

export const getPropertyFilteredData = (data: Partial<IProperty>) => {
  const copy = { ...data };

  delete copy?.address?.renterId;
  delete copy?.address?.id;
  delete copy?.address?.ownerId;
  delete copy?.roomDetails?.id;

  return copy;
};
