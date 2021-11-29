import createError from "http-errors";
import { documentClient } from "../utils/config";
import { ProductTable } from "../utils/constants";

export const SaveProductAsync = async (product: any) => {
  try {
    let strBody = JSON.stringify(product);
    console.info(`Save Product Begins: String request - ${strBody}`);
    console.info(
      `Save Product Begins: Service Table - ${ProductTable}'-'${product.Category}`
    );
    let result = await documentClient
      .put({
        TableName: ProductTable,
        Item: product,
      })
      .promise();
    console.info("Save Product :", product); 
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
