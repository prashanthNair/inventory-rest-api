import middy from "@middy/core";
import cors from "@middy/http-cors";
import { ProductRequestModel } from "../models/productRequestModel";
import { SaveProductAsync } from "../services/postProduct";
import createError from "http-errors"; 

export const saveProduct = async (event: any, context: any) => {
  try { 
    let body=event.body;
    let productRequest:ProductRequestModel = JSON.parse(body);
    console.info(`Request: Path: ${event.path}, Method:${event.httpMethod} Headers:${event.headers}, Body:${event.body}`);
    productRequest.ProductId = "P" + new Date().getTime().toString();
    productRequest.CreatedDate = new Date().toISOString(); 
    productRequest.Status="Active";
    let response = await SaveProductAsync(productRequest);
    console.info(`Response: Path: ${event.path}, Method:${event.httpMethod} Body:${response}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
    
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
export const handler =  middy(saveProduct).use(cors())