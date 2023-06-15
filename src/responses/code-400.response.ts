import { IResponse } from '../interfaces';

export const response400 : IResponse = {
  statusCode: 400,
  message: 'Bad Request',
  error: 'Bad Request',
}

export const response401 : IResponse = {
  statusCode: 401,
  message: 'Unauthorized',
  error: 'Unauthorized',
}

export const response403 : IResponse = {
  statusCode: 403,
  message: 'Forbidden',
  error: 'Forbidden',
}

export const response404 : IResponse = {
  statusCode: 404,
  message: 'Not Found',
  error: 'Not Found',
}
