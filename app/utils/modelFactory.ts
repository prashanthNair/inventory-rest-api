import { DeliveryDetails, ProductModel } from '../models/productModel';

export const Create = (productModel: any) => {
  const DeliveryDetails = {
    DeliverMode: '',
  };
  const ComboProductDetails = {
    ItemName: '',
    ProductBrand: '',
    ItemForm: '',
    Price: '',
    Units: '',
    Tag: '',
  };
  const productRequest: ProductModel = {
    ProductId: 'P' + new Date().getTime().toString(),
    ProductCategory: productModel.ProductCategory
      ? productModel.ProductCategory
      : '',
    BrandId: productModel.BrandId ? productModel.BrandId : '',
    SellingPrice: productModel.SellingPrice,
    ProductBrand: productModel.ProductBrand,
    AgeGroup: productModel.AgeGroup,
    Warranty: productModel.Warranty,
    PackageDetails: productModel.PackageDetails,
    Notes: productModel.Notes,
    Tags: productModel.Tags,
    ReturnRefund: productModel.ReturnRefund,
    GST: productModel.GST,
    LoyaltyPoint: productModel.LoyaltyPoint,
    LocalDeliveryCharge: productModel.LocalDeliveryCharge,
    ZonalDeliveryCharge: productModel.ZonalDeliveryCharge,
    NationalDeliveryCharge: productModel.NationalDeliveryCharge,
    CreatedAt: new Date().toLocaleString(),
    UpdatedAt: new Date().toLocaleString(),
    Status: 'Active',
    ProductName: productModel.ProductName ? productModel.ProductName : '',
    ProductType: productModel.ProductType ? productModel.ProductType : '',
    Category: productModel.Category ? productModel.Category : '',
    Title: productModel.Title ? productModel.Title : '',
    Details: productModel.Details ? productModel.Details : '',
    ComboProduct: productModel.ComboProduct
      ? productModel.ComboProduct
      : [ComboProductDetails],
    MRP: productModel.MRP ? productModel.MRP : '',
    TraceId: productModel.TraceId ? productModel.TraceId : '',
  };
  return productRequest;
};
