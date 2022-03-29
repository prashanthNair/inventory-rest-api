import middy from "@middy/core";
import cors from "@middy/http-cors";
import createError from "http-errors";
import { ProductModel } from "../models/productModel";
import { editProduct } from "../services/editProduct";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMiddleware";

const updateProduct = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: Update Action:UpdateProductContact `
    );

    let validateResponse = ValidateHeader(event["headers"]);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest = MakeHeaderRequest(event["headers"]);

    console.log("Header", headerRequest);

    if (!event.body || !event.pathParameters) {
      const err = new createError.NotFound("Body or pathParameters missing");
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }

    let productModel: ProductModel = JSON.parse(event.body);
    let ProductId = event.pathParameters.ProductId;

    const productRequest = {
      ProductId: ProductId,
      ProductCategory: productModel.ProductCategory,
      SellingPrice: productModel.SellingPrice,
      UpdatedAt: new Date().toLocaleString(),
      Status: productModel.Status,
      ProductName: productModel.ProductName,
      ProductType: productModel.ProductType,
      Category: productModel.Category,
      Title: productModel.Title,
      Rating: productModel.Rating,
      Details: productModel.Details,
      MRP: productModel.MRP,
      Price: productModel.Price,
      LoyaltyPercentage: productModel.LoyaltyPercentage,
      DeliverMode: productModel.DeliveryDetails?.DeliverMode,
    };
      
    if (!productRequest.ProductId || !productRequest.ProductCategory) {
      const err = new createError.NotFound("Product Id and ProductCategory required");
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }
    let response = await editProduct(productRequest);
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: PATCH Action: Update product Contact `
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
export const handler = middy(updateProduct).use(cors());
