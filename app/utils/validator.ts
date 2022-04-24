const BODY: any = [
  'BrandId',
  'ProductId',
  'SellingPrice',
  'Title',
  'ImageLinks',
  'ProductDescription',
  'Category',
  'ProductCategory',
];
export function isValidBody(bodyObj: any) {
  let response = {
    isValid: true,
    message: '',
  };
  let errors: any = [];
  BODY.forEach((x: any) => {
    if (!bodyObj[x] || bodyObj[x] === '') {
      errors.push(x);
    }
  });
  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields ${[...errors]}`,
    };
  }
  return response;
}
