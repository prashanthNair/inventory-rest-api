import createError from "http-errors";
import { dynamoDB } from "../utils/config";
import { ProductCategoryTable } from "../utils/constants";

export const viewAllProductCategory = async (params) => {
  try {
    let query = {
      Statement: `SELECT * FROM "${ProductCategoryTable}" WHERE CategoryId = '${params}'`,
    };
    var result: any = await dynamoDB.executeStatement(query).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
