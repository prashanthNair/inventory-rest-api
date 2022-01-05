import middy from "@middy/core";
import cors from "@middy/http-cors"; 
import { getProducts } from "../services/getProducts"; 

const getAllProducts = async (event: any, context: any) => {  
  console.info("getAllProducts Request", event); 
const brandrequest = event.pathParameters.BrandId
  let response = await getProducts(brandrequest);
  let data = response.data;
  return {
    statusCode: 200,
    body: JSON.stringify(data||{}),
  };
};
export const handler = middy(getAllProducts).use(cors());
