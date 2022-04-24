import AWS from 'aws-sdk';
import createError from 'http-errors';
import { dynamoDB, documentClient } from '../utils/config';
import { ProductTable } from '../utils/constants';

export const getProductsByBrandId = async (BrandId: any) => {
  try {
    console.info(`getAllProductsByBrandId Request params: ${BrandId}`);
    const statement = `SELECT * FROM Products-dev where BrandId = '${BrandId}'`;
    let query = {
      Statement: statement,
    };
    var result: any = await dynamoDB.executeStatement(query).promise();
    console.log('result', JSON.stringify(result));
    if (result && result.Items && result.Items.length <= 0) return {};

    var converted = result.Items.map((el: any) =>
      AWS.DynamoDB.Converter.unmarshall(el)
    );
    console.info(`Response DataStore: ${result.Items}`);
    console.info(`Response DataStore converted: ${converted}`);
    if (converted && converted.length <= 0)
      throw new createError.InternalServerError();

    return converted[0];
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const scanProductsByBrandId = async (BrandId: any) => {
  try {
    var params = {
      TableName: 'Products-dev',
      FilterExpression: '#BrandId = :BrandId',
      ExpressionAttributeNames: {
        '#BrandId': 'BrandId',
      },
      ExpressionAttributeValues: { ':BrandId': BrandId },
    };

    var result: any = await documentClient.scan(params);
    console.log('result', result);

    return result.Items;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
