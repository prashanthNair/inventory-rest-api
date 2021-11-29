import middy from "@middy/core";
import cors from "@middy/http-cors";
import { ProductRequestModel } from "../models/productRequestModel";
import { SaveProductAsync } from "../services/postProduct";

const saveProduct = async (event: any, context: any) => {
  let productRequest: ProductRequestModel = JSON.parse(event.body);
  console.info("Request Event", event);
  console.info("Request Body", event.body);
  productRequest.ProductId = "P" + new Date().getTime().toString();
  productRequest.CreatedDate = new Date().toString();

  let response = await SaveProductAsync(productRequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
export const handler = middy(saveProduct).use(cors());
