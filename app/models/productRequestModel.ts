export class ProductRequestModel {
    ProductId: string;
    ProductName: string;
    ProductType: ProductType;
    BrandName: string;
    Category: string;
    ProductCategory: string;
    Title: string;
    Rating: number;
    Details: ClothingAndFootware;
    ComboProductDetails: Array<ComboProductDetails>;
    MRP: number;
    Price: number;
    LoyalityPercentage: number;
    BuddyMargin: number;
    DeliveryDetails: DeliveryDetails;
    CreatedDate: string;
    Status?: "Active";
    
  }
  export enum ProductType{
    EXCLUSIVE,
    COMBO
  }
  export class GroceryAndHouseholds {
    ItemName: string;
    ShelfLife: string;
    ProductBrand: string;
    Weight: string;
    ImagesUrl: string;
    PackageWeight: string;
    Description: string;
    KeyPoints: Array<string>;
    Tag: string;
  }
  
  export class ClothingAndFootware {
    ItemName: string;
    Size: string;
    Colour: string;
    ProductBrand: string;
    ImagesUrl: string;
    PackageWeight: string;
    Description: string;
    KeyPoints: Array<string>;
    Tag: string;
  }
  export class DeliveryDetails {
    DeliverMode: string;
  }
  export class ComboProductDetails {
    ItemName: string;
    ProductBrand: string;
    IteamForm: string;
    Price: number;
    Units: number;
    Tag: string;
  }
  
  
