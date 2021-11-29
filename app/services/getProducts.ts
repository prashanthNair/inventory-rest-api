import createError from "http-errors"; 
import { dynamoDB } from "../utils/config";
import { ProductTable } from "../utils/constants";

export const getProducts = async () => {
  let query = `SELECT * FROM Product-dev WHERE "STATUS"=true`;
  let statment = {
    Statement: query,
  };
  console.info("getProducts request", query);
  try {
    const result:any = await dynamoDB.executeStatement(statment);
    console.info("getProducts respone", result);
    return result.response;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
