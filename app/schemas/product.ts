export const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        BrandId: { type: 'string' },
        ProductName: { type: 'string' },
        ProductType: { type: 'string' },
      },
      required: ['BrandId', 'ProductName', 'ProductType', 'ImageLinks'],
    },
  },
};
