import { ProductModel } from '../models/productModel';
import createError from 'http-errors';
import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/commonMiddleware';
import { SaveProductAsync } from '../services/saveProduct';
import { Create } from '../utils/modelFactory';
import { isValidBody } from '../utils/validator';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:createBrand `
    );
    let validateResponse = ValidateHeader(event['headers']);

    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
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
      const err = new createError.NotFound('Body Missing');
      return responseBuilder(err, 400);
    }

    let productModel: ProductModel = JSON.parse(event.body);
    let isValidBodyRes = isValidBody(productModel);
    if (!isValidBodyRes.isValid) {
      console.info(
        `Error: Request Body is: ${isValidBodyRes.isValid}, ${isValidBodyRes.message}}`
      );
      return responseBuilder(isValidBodyRes, 400);
    }
    let response = await SaveProductAsync(productModel);

    console.info(
      `Response: Path: ${event.path}, Method:${
        event.httpMethod
      } Body:${JSON.stringify(response)}`
    );

    return responseBuilder(response, 200);
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );

    return responseBuilder(error, 500);
  }
};
