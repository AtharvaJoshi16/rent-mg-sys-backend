export const specs = {
  openapi: "3.0.0",
  info: {
    title: "Rent Management System API service",
    version: "1.0.0",
    description: "API documentation for Rent Management System",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      QueryParams: {
        type: "object",
        properties: {
          id: { type: "integer", example: 12345678 },
          email: { type: "string", example: "example@example.com" },
          firstName: { type: "string", example: "John" },
          middleName: { type: "string", example: "D" },
          isVerified: { type: "boolean", example: true },
          isEmailVerified: { type: "boolean", example: true },
          lastName: { type: "string", example: "Doe" },
          phone1: { type: "string", example: "+1234567890" },
          phone2: { type: "string", example: "+0987654321" },
          aadharId: { type: "string", example: "1234-5678-9012" },
          panId: { type: "string", example: "ABCDE1234F" },
          drivingLicenseId: { type: "string", example: "DL-1234567890" },
          voterId: { type: "string", example: "VOTER12345" },
          addressLine: { type: "string", example: "123 Main St" },
          city: { type: "string", example: "New York" },
          state: { type: "string", example: "NY" },
          pincode: { type: "integer", example: 10001 },
          preferredContactMethod: {
            type: "string",
            enum: ["EMAIL", "PHONE", "ANY"],
            example: "EMAIL",
          },
          preferredLanguage: { type: "string", example: "English" },
          edPhone1: { type: "string", example: "+1234567890" },
          edPhone2: { type: "string", example: "+0987654321" },
          edEmail: { type: "string", example: "ed@example.com" },
          edFirstName: { type: "string", example: "Jane" },
          edMiddleName: { type: "string", example: "M." },
          edLastName: { type: "string", example: "Smith" },
          edRelation: { type: "string", example: "Spouse" },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: {
    "/api/v1/owners": {
      get: {
        summary: "List all owners",
        description:
          "Retrieve a list of owners with optional query parameters.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "queryParams",
            required: false,
            schema: {
              $ref: "#/components/schemas/QueryParams",
            },
          },
        ],
        responses: {
          "200": {
            description: "A list of owners",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { type: "object" },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/owners/{id}": {
      get: {
        summary: "Retrieve an owner",
        description: "Get details of an owner by their ID.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
              example: 12345678,
              minimum: 10000000,
              maximum: 99999999,
            },
            description: "Owner ID, must be an 8-digit number.",
          },
          {
            in: "query",
            name: "queryParams",
            required: false,
            schema: {
              $ref: "#/components/schemas/QueryParams",
            },
          },
        ],
        responses: {
          "200": {
            description: "Owner details",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
          "404": {
            description: "Owner not found",
          },
        },
      },
    },
  },
};
