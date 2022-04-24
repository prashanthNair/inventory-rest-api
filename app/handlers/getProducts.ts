import _ from 'lodash';
import {
  getProductsByBrandId,
  scanProductsByBrandId,
} from '../services/getProductsByPartnerId';
import {
  ValidateHeader,
  MakeHeaderRequest,
  responseBuilder,
} from '../utils/commonMiddleware';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: GET Action:getBrandProducts `
    );
    let validateResponse = ValidateHeader(event['headers']);
    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }
    const headerRequest = MakeHeaderRequest(event['headers']);
    console.log('Header', headerRequest);

    console.info('getAllProducts Request', event.pathParameters);
    let { BrandId } = event.pathParameters;
    let res = await scanProductsByBrandId(BrandId);

    let filterData = _.groupBy(res.body, 'ProductType');
    let exclusiveCategory = _.groupBy(filterData['Exclusive'], 'Category');
    let comboCategory = _.groupBy(filterData['Combo'], 'Category');

    let data = {
      Exclusive: exclusiveCategory,
      Combo: comboCategory,
    };
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(data),
      }} Method: GET Action:getBrandProducts `
    );
    return responseBuilder(data, 200);
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );
    return responseBuilder(error, 500);
  }
};
