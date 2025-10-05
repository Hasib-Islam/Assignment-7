import { Response } from 'express';

interface ResponseOptions {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  meta?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const sendResponse = (res: Response, options: ResponseOptions): void => {
  const { success, statusCode, message, data, meta } = options;

  const response: any = {
    success,
    message,
    statusCode,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  res.status(statusCode).json(response);
};
