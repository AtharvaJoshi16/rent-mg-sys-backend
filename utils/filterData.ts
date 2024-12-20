export const filterPayload = (data: any) => {
  const payload = { ...data };

  Object.keys(payload).forEach((field) => {
    if ([undefined, null, ""].includes(payload[field])) {
      delete payload[field];
    }
  });
  return payload;
};
