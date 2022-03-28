import middy from "@middy/core";
import cors from "@middy/http-cors";
import createError from "http-errors";
import _ from "lodash";  
import { getAllProductsByPartnerId } from "../services/getProductsByPartnerId";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMiddleware";

const getBrandProducts = async (event: any) => {
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

    console.info("getAllProducts Request", event.pathParameters);
    let { PartnerId } = event.pathParameters;
    let res = await getAllProductsByPartnerId(PartnerId);

    let filterData = _.groupBy(res.body, "ProductType");
    let exclusiveCategory = _.groupBy(filterData["Exclusive"], "Category");
    let comboCategory = _.groupBy(filterData["Combo"], "Category");

    let data = {
      Exclusive: exclusiveCategory,
      Combo: comboCategory,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error:any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
export const handler = middy(getBrandProducts).use(cors());
