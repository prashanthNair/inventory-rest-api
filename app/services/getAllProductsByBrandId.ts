import AWS from "aws-sdk";
import createError from "http-errors";
import { dynamoDB } from "../utils/config";
import { ProductTable } from "../utils/constants";

export const getAllProductsByBrandId = async (brandId:any) => {
  try {
    let query = {
      Statement: `SELECT * FROM "${ProductTable}" where BrandId = '${brandId}'`,
    };
    var result:any = await dynamoDB.executeStatement(query).promise();
    var converted = result.Items.map((el:any) =>
      AWS.DynamoDB.Converter.unmarshall(el)
    );
    return {
      statusCode: 200,
      body: converted,
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}; 
  
