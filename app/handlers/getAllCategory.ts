import { viewAllCategory } from '../services/viewAllCategory';
import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/commonMiddleware';

export const handler = async (event: any) => {
  try {
    let validateResponse = ValidateHeader(event['headers']);
    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }
    const headerRequest = MakeHeaderRequest(event['headers']);
    console.log('Header', headerRequest);

    console.info('Request Event', event);
    let response = await viewAllCategory();
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
