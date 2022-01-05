import createError from "http-errors"; 
import { documentClient, dynamoDB } from "../utils/config";
import { ProductTable } from "../utils/constants";

export const getAllProductsByBrandId = async (brandId) => {
  let query =`SELECT * FROM "${ProductTable}" WHERE "BrandId" = '${brandId}'`
  let statment = {
    Statement: query,
  };
  console.info("getAllProductsByBrandId request", query);
  try {
    const result:any = await dynamoDB.executeStatement(statment)
    console.info("getAllProductsByBrandId respone", result);
    return result.response;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const getProducts = async () => {
  const params = {
    TableName: ProductTable,
  }; 
  console.info("getProducts request", ProductTable);
  try {
    const result:any = await documentClient.scan(params)
    console.info("getProducts respone", result);
    return result.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
