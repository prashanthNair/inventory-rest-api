import { documentClient } from "../utils/config";
import createError from "http-errors";
import { ProductTable } from "../utils/constants";

export const editProduct = async (productRequest: any) => {
  try {
    const params = {
      TableName: ProductTable,
      Key: {
        ProductId: productRequest.ProductId,
        ProductCategory: productRequest.ProductCategory,
      },
      ExpressionAttributeNames: {
        "#SellingPrice": "SellingPrice",
        "#Status": "Status",
        "#ProductName": "ProductName",
        "#ProductType": "ProductType",
        "#Category": "Category",
        "#Title": "Title",
        "#Rating": "Rating",
        "#Details": "Details",
        "#MRP": "MRP",
        "#Price": "Price",
        "#LoyaltyPercentage": "LoyaltyPercentage",
        "#UpdatedAt": "UpdatedAt",
      },
      ExpressionAttributeValues: {
        ":SellingPrice": productRequest.SellingPrice,
        ":Status": productRequest.Status,
        ":ProductName": productRequest.ProductName,
        ":ProductType": productRequest.ProductType,
        ":Category": productRequest.Category,
        ":Title": productRequest.Title,
        ":Rating": productRequest.Rating,
        ":Details": productRequest.Details,
        ":MRP": productRequest.MRP,
        ":Price": productRequest.Price,
        ":LoyaltyPercentage": productRequest.LoyaltyPercentage,
        ":DeliverMode": productRequest.DeliverMode,
        ":UpdatedAt": productRequest.UpdatedAt,
      },
      UpdateExpression:
        "SET #SellingPrice = :SellingPrice, #Status = :Status ,#ProductName = :ProductName, #ProductType = :ProductType, #Category = :Category,#Title = :Title, #Rating = :Rating, #Details = :Details, #MRP = :MRP,#Price = :Price,#LoyaltyPercentage = :LoyaltyPercentage, DeliveryDetails.DeliverMode = :DeliverMode, #UpdatedAt = :UpdatedAt",
      ReturnValues: "ALL_NEW",
    };

    let strBody = JSON.stringify(productRequest);
    console.info(`Edit Product Begins: String request - ${strBody}`);
    console.info(`Edit Product - ${params}`);
    console.info(
      `Edit Product Begins: Service Table - ${ProductTable}'-'${productRequest.ProductId}`
    );
    await documentClient.update(params).promise();

    console.info("Edit Product Service End:", productRequest);
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: productRequest,
  };
};
