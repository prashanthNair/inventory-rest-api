import middy from "@middy/core";
import cors from "@middy/http-cors";
import { ProductModel } from "../models/ProductRequestModel";
import { SaveProductAsync } from "../services/saveProduct";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMidleware";

export const saveProduct = async (event: any) => {
  try {
    let validateResponse = ValidateHeader(event["headers"]);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest = MakeHeaderRequest(event["headers"]);
    console.log("Header", headerRequest);

    let ProductModel: ProductModel = JSON.parse(event.body);
    console.info(
      `Request: Path: ${event.path}, Method:${event.httpMethod} Headers:${event.headers}, Body:${event.body}`
    );

    const ProductRequest: any = {
      ProductId: "P" + new Date().getTime().toString(),
      ProductCategory: ProductModel.ProductCategory ? ProductModel.ProductCategory : "deafult",
      CreatedAt: new Date().toLocaleString(),
      UpdatedAt: new Date().toLocaleString(),
      Status : "Active" 
    }
    let response = await SaveProductAsync(ProductRequest);
    console.info(
      `Response: Path: ${event.path}, Method:${event.httpMethod} Body:${response}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
export const handler = middy(saveProduct).use(cors());
