import middy from "@middy/core";
import cors from "@middy/http-cors";
import _ from "lodash";
import { getAllProductsByBrandId } from "../services/getAllProductsByBrandId";

const getBrandProducts = async (event: any) => {
  console.info("getAllProducts Request", event.pathParameters);
  let { BrandId } = event.pathParameters;
  let res = await getAllProductsByBrandId(BrandId);
  let filterData = _.groupBy(res.body, "ProductType"); 
  let exclusiveCategory = _.groupBy(filterData['Exclusive'], "Category");
  let comboCategory = _.groupBy(filterData['Combo'], "Category");

  let data={
    "Exclusive":exclusiveCategory,
    "Combo": comboCategory
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
export const handler =  middy(getBrandProducts).use(cors())