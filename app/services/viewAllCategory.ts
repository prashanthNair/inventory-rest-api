import createError from "http-errors";
import { ProductCategoryTable } from "../utils/constants";
import { dynamoDB } from "../utils/config";

export const viewAllCategory = async () => {
  try {
    let query = {
      Statement: `SELECT * FROM "${ProductCategoryTable}"`,
    };
    var result: any = await dynamoDB.executeStatement(query).promise();
    return {
      statusCode: 200,
      body: result,
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
