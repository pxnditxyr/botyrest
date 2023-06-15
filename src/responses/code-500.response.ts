import { IResponse } from '../interfaces';

export const response500 : IResponse = {
  statusCode: 500,
  message: 'Internal Server Error',
  error: 'Internal Server Error, please check the logs',
}

export const response501 : IResponse = {
  statusCode: 501,
  message: 'Not Implemented',
  error: 'Not Implemented',
}
