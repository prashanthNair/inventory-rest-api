import { dynamoDB } from './config';
import { ProductTable, HeaderConstants } from './constants';

export const responseBuilder = (data: any, status = 200) => {
  if (!data) {
    data = {};
  }
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': false,
      'Access-Control-Allow-Headers':
        'Content-Type, Custom-Header,Access-Control-Allow-Headers,x-mibapi-customerid, X-MIBAPI-CustomerID,X-MIBAPI-CustomerType,x-mibapi-customertype,x-mibapi-token,X-MIBAPI-Token,x-mibapi-source,X-MIBAPI-Source,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, HEAD',
    },
    body: JSON.stringify(data),
  };
};

export const ValidateHeader = (headers: any) => {
  let errorMessages = [];

  if (!headers) {
    return {
      Message: 'Bad Request',
      StatusCode: 400,
    };
  }

  if (!headers[HeaderConstants.CustomerID]) {
    errorMessages.push(` ${HeaderConstants.CustomerID} 'is required'`);
  }
  if (!headers[HeaderConstants.CustomerType]) {
    errorMessages.push(` ${HeaderConstants.CustomerType} 'is required'`);
  }
  if (!headers[HeaderConstants.Source]) {
    errorMessages.push(` ${HeaderConstants.Source} 'is required'`);
  }
  if (!headers[HeaderConstants.Token]) {
    errorMessages.push(` ${HeaderConstants.Token} 'is required'`);
  }
  return {
    Message: errorMessages,
    Status: true, //errorMessages.length > 0 ? false : true,
    StatusCode: 200,
  };
};

export const MakeHeaderRequest = (headers: any) => {
  if (!headers) return null;

  let headerRequest: any = {};
  headerRequest['CustomerID'] = headers['X-MIBAPI-CustomerID'];
  headerRequest['CustomerType'] = headers['X-MIBAPI-CustomerType'];
  headerRequest['Source'] = headers['X-MIBAPI-Source'];
  headerRequest['Token'] = headers['X-MIBAPI-Token'];
  headerRequest['TraceID'] = headers['X-MIBAPI-Trace-Id'];
  return headerRequest;
};
