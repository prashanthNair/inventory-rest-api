import middy from "@middy/core";
import cors from "@middy/http-cors";
import {
  MakeHeaderRequest,
  ValidateHeader,
} from "../utils/commonMiddleware";

export const healthCheck = async (event: any) => {
  let validateResponse = ValidateHeader(event["headers"]);
  if (!validateResponse.Status) {
    return {
      statusCode: 200,
      body: JSON.stringify(validateResponse),
    };
  }
  const headerRequest = MakeHeaderRequest(event["headers"]);

  console.log("Header", headerRequest);
  let response = { status: true, message: "Inventory Api Health Check Passed" };
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
export const handler = middy(healthCheck).use(cors());
