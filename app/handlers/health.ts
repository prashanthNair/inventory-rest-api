import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/commonMiddleware';

export const handler = async (event: any, context: any) => {
  console.log(context);
  let validateResponse = ValidateHeader(event['headers']);
  if (!validateResponse.Status) {
    return responseBuilder(validateResponse);
  }
  const headerRequest = MakeHeaderRequest(event['headers']);

  console.log('Header', headerRequest);
  let response = { status: true, message: 'Inventory Api Health Check Passed' };
  return responseBuilder(response);
};
