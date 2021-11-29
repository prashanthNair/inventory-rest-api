 
import middy from "@middy/core"; 
import cors from "@middy/http-cors";
export const healthCheck= async(event:any, context:any)=> { 

  let respose = {status:true, message: "Inventory Api Health Check Passed"}
  return {
    statusCode: 200,
    body: JSON.stringify(respose),
  };
}

 export const handler = middy(healthCheck)
 .use(cors());
    
