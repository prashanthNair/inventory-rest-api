import middy from "@middy/core";
import cors from "@middy/http-cors";
import createError from "http-errors";
import { viewAllProductCategory } from "../services/viewAllProductCategory";

const getAllProductCategory = async (event: any) => {
  if (event.pathParameters == null) {
    return new createError.NotFound("params missing");
  }
  console.info("Request Event", event.pathParameters);
  const params = event.pathParameters.CategoryId;
  let response = await viewAllProductCategory(params);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const handler = middy(getAllProductCategory).use(cors());
