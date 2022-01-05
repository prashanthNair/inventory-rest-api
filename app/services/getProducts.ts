import AWS from "aws-sdk";
import createError from "http-errors"; 
import { documentClient, dynamoDB } from "../utils/config";
import { ProductTable } from "../utils/constants";

export const getAllProductsByBrandId = async (brandId) => {
  try {
    let query = {
      Statement: `SELECT * FROM "${ProductTable}" where BrandId = '${brandId}'`,
    };
    var result = await dynamoDB.executeStatement(query).promise();
    // var result = await dynamoDB.executeStatement(query).promise();
    var converted = result.Items.map((el) =>
  AWS.DynamoDB.Converter.unmarshall(el)
    );
  
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: converted,
  };
};



