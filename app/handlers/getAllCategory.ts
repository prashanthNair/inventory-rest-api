import middy from "@middy/core";
import cors from "@middy/http-cors";
import createError from "http-errors";
import { viewAllCategory } from "../services/viewAllCategory";
import { MakeHeaderRequest, ValidateHeader } from "../utils/commonMiddleware";

const getAllCategory = async (event: any) => {
  try {
    let validateResponse = ValidateHeader(event["headers"]);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest = MakeHeaderRequest(event["headers"]);
    console.log("Header", headerRequest);

    console.info("Request Event", event);
    let response = await viewAllCategory();
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

export const handler = middy(getAllCategory).use(cors());
