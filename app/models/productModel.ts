export class ProductModel {
  BrandId?: string;
  ProductId?: string;
  SellingPrice?: string;
  ProductName?: string;
  ProductType?: ProductType;
  ProductBrand?: string;
  Category?: string;
  ProductCategory?: string;
  Title?: string;
  CountryOfOrigin?: string;
  ImageLinks?: any;
  KeyPoints?: Array<string>;
  AgeGroup?: string;
  Warranty?: string;
  PackageDetails?: string;
  Notes?: string;
  Tags?: [];
  ReturnRefund?: string;
  GST?: string;
  LoyaltyPoint?: string;
  LocalDeliveryCharge?: string;
  ZonalDeliveryCharge?: string;
  NationalDeliveryCharge?: string;
  Rating?: number;
  Details?: any;
  ComboProduct?: [ComboProductDetails];
  MRP?: number;
  BuddyMargin?: number;
  DeliveryDetails?: DeliveryDetails;
  CreatedAt?: string;
  UpdatedAt?: string;
  Status?: 'Active';
  TraceId?: string;
}
export enum ProductType {
  EXCLUSIVE,
  COMBO,
}
export class GroceryAndHouseholds {
  ItemName?: string;
  ShelfLife?: string;
  ProductBrand?: string;
  Weight?: string;
  ImagesUrl?: string;
  PackageWeight?: string;
  Description?: string;
  KeyPoints?: Array<string>;
  Tag?: string;
}

export class ClothingAndFootWare {
  ItemName?: string;
  Size?: string;
  Colour?: string;
  ProductBrand?: string;
  ImagesUrl?: string;
  PackageWeight?: string;
  Description?: string;
  KeyPoints?: Array<string>;
  Tag?: string;
}
export class DeliveryDetails {
  DeliverMode?: string;
}
export class ComboProductDetails {
  ItemName?: string;
  ProductBrand?: string;
  ItemForm?: string;
  Price?: number;
  Units?: number;
  Tag?: string;
}
