export class ProductRequestModel {
  constructor(){
    this.CreatedAt=new Date().toLocaleString();
  }
  PartnerId?: string;
  ProductId?: string;
  ProductName?: string;
  ProductType?: ProductType;
  BrandName?: string;
  Category?: string;
  ProductCategory?: string;
  Title?: string;
  ImageLinks?:any;
  Rating?: number;
  Details?: any;
  ComboProductDetails?: [];
  MRP?: number;
  Price?: number;
  LoyaltyPercentage?: number;
  BuddyMargin?: number;
  DeliveryDetails?: DeliveryDetails;
  CreatedAt?: string;
  UpdatedAt?: string;
  Status?: "Active";
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
