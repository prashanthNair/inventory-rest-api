import middy from "@middy/core";
import cors from "@middy/http-cors";
import createError from "http-errors";
import { getProducts } from "../services/getProducts";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMidleware";

const getAllProducts = async (event: any) => {
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

    console.info("getAllProducts Request", event);
    let response = await getProducts();
    let data = response;
    return {
      statusCode: 200,
      body: JSON.stringify(data || {}),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
export const handler = middy(getAllProducts).use(cors());
