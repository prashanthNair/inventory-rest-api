import createError from "http-errors";
import { documentClient } from "../utils/config";
import { ProductTable } from "../utils/constants";

export const SaveProductAsync = async (ProductRequest: any) => {
  try {
    let strBody = JSON.stringify(ProductRequest);
    console.info(`Save Product Begins: String request - ${strBody}`);
    console.info(
      `Save Product Begins: Service Table - ${ProductTable}'-'${ProductRequest.Category}`
    );
    await documentClient
      .put({
        TableName: ProductTable,
        Item: ProductRequest,
      })
      .promise();

    console.info("Save Product :", ProductRequest);
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: ProductRequest,
  };
};
