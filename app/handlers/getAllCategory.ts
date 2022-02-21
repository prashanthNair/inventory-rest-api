import middy from "@middy/core";
import cors from "@middy/http-cors";
import { viewAllCategory } from "../services/viewAllCategory";

const getAllCategory = async (event: any) => {
  console.info("Request Event", event);
  let response = await viewAllCategory();
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const handler = middy(getAllCategory).use(cors());;
