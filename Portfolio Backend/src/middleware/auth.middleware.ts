import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { sendResponse } from '../utils/sendResponse';
import httpStatus from 'http-status-codes';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Access token required',
        data: null,
      });
    }

    if (!process.env.JWT_SECRET) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'JWT secret not configured',
        data: null,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'User not found',
        data: null,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Invalid or expired token',
      data: null,
    });
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'ADMIN') {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.FORBIDDEN,
      message: 'Admin access required',
      data: null,
    });
  }
  next();
};
