import middy from "@middy/core";
import cors from "@middy/http-cors";
import _ from "lodash";
import { getAllProductsByBrandId } from "../services/getProducts";

const getBrandProducts = async (event: any, context: any) => {
  console.info("getAllProducts Request", event.pathParameters);
  let { BrandId } = event.pathParameters;
  let res = await getAllProductsByBrandId(BrandId);
  let data = _.groupBy(res.body, "Category");
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
export const handler = middy(getBrandProducts).use(cors());
