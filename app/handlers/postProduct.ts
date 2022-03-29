import middy from "@middy/core";
import cors from "@middy/http-cors";
import { ProductModel } from "../models/productModel";
import createError from "http-errors";
import { MakeHeaderRequest, ValidateHeader } from "../utils/commonMiddleware";
import { SaveProductAsync } from "../services/saveProduct";
import { Create } from "../utils/modelFactory";

export const saveProduct = async (event: any) => {
  try {
    let validateResponse = ValidateHeader(event["headers"]);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest: any = MakeHeaderRequest(event.headers);

    console.info(
      `Request: Path: ${event.path}, Method:${
        event.httpMethod
      } Headers:${JSON.stringify(event.headers)}, Body:${JSON.stringify(
        event.body
      )} TraceId: ${headerRequest.TraceId}`
    );
    
    if (!event.body) {
      const err = new createError.NotFound("Body Missing");
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }

    let productModel: ProductModel = JSON.parse(event.body);
    let productRequest = Create(productModel);

    let response = await SaveProductAsync(productRequest);

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
    };
  }
};
export const handler = middy(saveProduct).use(cors());
