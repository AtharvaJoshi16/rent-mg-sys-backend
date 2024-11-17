export const filterAddressPayload = (data: any) => {
  const allowedFields = [
    "city",
    "addressLine",
    "pincode",
    "electricityBill",
    "propertyTaxBill",
    "state",
  ];
  const payload = { ...data };
  Object.keys(payload).forEach((field) => {
    if (!allowedFields.includes(field)) {
      delete payload[field];
    }
  });
  return payload;
};

export const filterEmergencyDetailsPayload = (data: any) => {
  const allowedFields = [
    "phone1",
    "email",
    "phone1",
    "firstName",
    "middleName",
    "lastName",
    "relation",
  ];
  const payload = { ...data };
  Object.keys(payload).forEach((field) => {
    if (!allowedFields.includes(field)) {
      delete payload[field];
    }
  });
  return payload;
};
