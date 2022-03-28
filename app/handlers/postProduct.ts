import middy from "@middy/core";
import cors from "@middy/http-cors";
import { ProductRequestModel } from "../models/productRequestModel";
import createError from "http-errors";
import { MakeHeaderRequest } from "../utils/commonMiddleware";
import { SaveProductAsync } from "../services/saveProduct";
import jsonBodyParser from "@middy/http-json-body-parser";

export const saveProduct = async (event: any) => {
  try {
    const headerRequest: any = MakeHeaderRequest(event.headers);
    console.info(
      `Request: Path: ${event.path}, Method:${
        event.httpMethod
      } Headers:${JSON.stringify(event.headers)}, Body:${JSON.stringify(
        event.body
      )} TraceId: ${headerRequest.TraceId}`
    );

    let body = event.body;
    // let productRequest: ProductRequestModel = JSON.parse(body);
    body.ProductId = "P" + new Date().getTime().toString();
    body.Status = "Active";
    let response = await SaveProductAsync(body);
    console.info(
      `Response: Path: ${event.path}, Method:${
        event.httpMethod
      } Body:${JSON.stringify(response)}`
    );
    if (!response) throw new createError.InternalServerError();

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
    }
  }
};
export const handler = middy(saveProduct).use(jsonBodyParser()).use(cors());
