import { viewAllProductCategory } from '../services/viewAllProductCategory';
import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/commonMiddleware';

const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:getAllProductCategory `
    );
    let validateResponse = ValidateHeader(event['headers']);
    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }
    const headerRequest = MakeHeaderRequest(event['headers']);
    console.log('Header', headerRequest);

    console.info('Request Event', event.pathParameters);
    const params = event.pathParameters.CategoryId;
    let response = await viewAllProductCategory(params);
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action:createBrand `
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
