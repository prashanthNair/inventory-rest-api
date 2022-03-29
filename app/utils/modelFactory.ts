import { DeliveryDetails } from "../models/productModel";

export const Create = (productModel: any) => {
  const DeliveryDetails = {
    DeliverMode: "",
  };
  const ComboProductDetails = {
    ItemName: "",
    ProductBrand: "",
    ItemForm: "",
    Price: "",
    Units: "",
    Tag: "",
  };
  const productRequest: any = {
    ProductId: "P" + new Date().getTime().toString(),
    ProductCategory: productModel.ProductCategory
      ? productModel.ProductCategory
      : "",
    PartnerId: productModel.PartnerId ? productModel.PartnerId: "",
    SellingPrice: productModel.SellingPrice ? productModel.SellingPrice : "",
    CreatedAt: new Date().toLocaleString(),
    UpdatedAt: new Date().toLocaleString(),
    Status: "Active",
    ProductName: productModel.ProductName ? productModel.ProductName : "",
    ProductType: productModel.ProductType ? productModel.ProductType : "",
    PartnerName: productModel.PartnerName ? productModel.PartnerName : "",
    Category: productModel.Category ? productModel.Category : "",
    Title: productModel.Title ? productModel.Title : "",
    Rating: productModel.Rating ? productModel.Rating : "",
    Details: productModel.Details ? productModel.Details : "",
    ComboProduct: productModel.ComboProduct
      ? productModel.ComboProduct
      : [ComboProductDetails],
    MRP: productModel.MRP ? productModel.MRP : "",
    Price: productModel.Price ? productModel.Price : "",
    LoyaltyPercentage: productModel.LoyaltyPercentage
      ? productModel.LoyaltyPercentage
      : "",
    PartnerMargin: productModel.PartnerMargin ? productModel.PartnerMargin : "",
    DeliveryDetails: productModel.DeliveryDetails
      ? productModel.DeliveryDetails
      : DeliveryDetails,
    TraceId: productModel.TraceId ? productModel.TraceId : "",
  };
  return productRequest;
};
