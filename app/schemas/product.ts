export const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        PartnerId: { type: "string" },
        ProductName: { type: "string" },
        ProductType: { type: "string" },
      },
      required: ["PartnerId", "ProductName", "ProductType",'ImageLinks'],
    },
  },
};
