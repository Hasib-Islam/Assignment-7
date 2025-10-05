import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import httpStatus from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { AuthRequest } from '../../middleware/auth.middleware';

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.login(req.body);

    res.cookie('accessToken', result.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Login successful',
      data: {
        user: result.user,
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Login failed';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: errorMessage,
      data: null,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Logout successful',
      data: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Logout failed';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    const tokens = await AuthService.refreshToken(refreshToken);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Token refreshed successfully',
      data: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Token refresh failed';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: errorMessage,
      data: null,
    });
  }
};

const getMe = async (req: AuthRequest, res: Response) => {
  try {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User retrieved successfully',
      data: {
        user: req.user,
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to get user';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

export const AuthController = {
  login,
  logout,
  refreshToken,
  getMe,
};
