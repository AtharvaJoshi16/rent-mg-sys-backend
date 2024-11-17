export const messages = {
  emptyCheck: (field: string) => `${field} cannot be empty.`,
  noDataProvided: "No data provided for update",
  address: {
    id: "Invalid Address ID",
    ownerId: "Address: Invalid Owner ID",
  },
  emergencyDetails: {
    id: "Invalid emergency details id",
    ownerId: "Address: Invalid Owner ID",
  },
  owner: {
    id: "Invalid ID (Should have min length of 8)",
    email: "Invalid Email",
    password: {
      length: "Password must have at least 10 characters",
      uppercase: "Password must contain at least one uppercase letter",
      digit: "Password must contain at least one digit",
      special: "Password must contain at least one special character",
    },
    userType: "Invalid user type",
    preferredContactMethod: "Invalid contact method",
  },
  property: {
    id: "Invalid ID (Should have min length of 8)",
    status: "Invalid property status",
    type: "Invalid property type",
    preferred: "Invalid preference",
    roomDetails: {
      id: "Invalid room id",
      rentType: "Invalid rent type",
    },
  },
  renter: {
    id: "Invalid ID (Should have min length of 8)",
  },
};
