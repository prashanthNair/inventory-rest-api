import createError from 'http-errors';
import { editProduct } from '../services/editProduct';
import {
  ValidateHeader,
  MakeHeaderRequest,
  responseBuilder,
} from '../utils/commonMiddleware';
import { isValidBody } from '../utils/validator';

const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: Update Action:UpdateProductContact `
    );

    let validateResponse = ValidateHeader(event['headers']);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest = MakeHeaderRequest(event['headers']);

    console.log('Header', headerRequest);

    if (!event.body || !event.pathParameters) {
      const err = new createError.BadRequest('Body or pathParameters missing');
      return responseBuilder(err, 400);
    }

    let productModel: any = JSON.parse(event.body);

    let isValidBodyRes = isValidBody(productModel);
    if (!isValidBodyRes.isValid) {
      console.info(
        `Error: Request Body is: ${isValidBodyRes.isValid}, ${isValidBodyRes.message}}`
      );
      return responseBuilder(isValidBodyRes, 400);
    }
    let response = await editProduct(productModel);
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: PATCH Action: Update product Contact `
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
