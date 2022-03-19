import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";
import { HeaderConstants } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { HeaderRequest } from "../models/headerRequest";

export default (handler: any) =>
  middy(handler).use([
    // httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
    cors(),
  ]);

export const ValidateHeader = (headers:any) => {
  let errorMessages = [];

  if (!headers[HeaderConstants.CustomerID]) {
    errorMessages.push(` ${HeaderConstants.CustomerID} 'is required'`);
  }
  if (!headers[HeaderConstants.CustomerType]) {
    errorMessages.push(` ${HeaderConstants.CustomerType} 'is required'`);
  }
  if (!headers[HeaderConstants.Source]) {
    errorMessages.push(` ${HeaderConstants.Source} 'is required'`);
  }
  if (!headers[HeaderConstants.Token]) {
    errorMessages.push(` ${HeaderConstants.Token} 'is required'`);
  }
  return {
    Message: errorMessages,
    Status: errorMessages.length > 0 ? false : true,
    StatusCode: 200,
  };
};

export const MakeHeaderRequest = (headers:any) => {
  if (!headers) return null;

  let headerRequest: any = {
    CustomerID: headers["X-MIBAPI-CustomerID"],
    CustomerType: headers["X-MIBAPI-CustomerType"],
    Source: headers["X-MIBAPI-Source"],
    Token: headers["X-MIBAPI-Token"],
    TraceId: uuidv4(),
  };
  
  return headerRequest;
};
