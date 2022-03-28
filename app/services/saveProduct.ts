import createError from "http-errors";
import { documentClient } from "../utils/config";
import { ProductTable } from "../utils/constants";

export const SaveProductAsync = async (ProductRequest: any) => {
  try {
    if(ProductRequest)
    return null;
    
    let strBody = JSON.stringify(ProductRequest);
    console.info(`Save Product Begins: String request - ${strBody}`);
    console.info(
      `Save Product Begins: Service Table - ${ProductTable}'-'${ProductRequest.Category}`
    );
    const response= await documentClient
      .put({
        TableName: ProductTable,
        Item: ProductRequest,
      })
      .promise();
     console.log('response', response);
    console.info("Save Product :", ProductRequest);
  } catch (error: any) {
    console.error(error);
    throw error;
  }
  return {
    statusCode: 200,
    body: ProductRequest,
  };
};
