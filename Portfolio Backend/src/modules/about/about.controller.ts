import { Request, Response } from 'express';
import { AboutService } from './about.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { AuthRequest } from '../../middleware/auth.middleware';

const getAbout = async (req: Request, res: Response) => {
  try {
    const about = await AboutService.getAbout();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'About data retrieved successfully',
      data: about,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to retrieve about data';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const updateAbout = async (req: AuthRequest, res: Response) => {
  try {
    const aboutData = req.body;
    const about = await AboutService.updateAbout(aboutData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'About data updated successfully',
      data: about,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update about data';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

export const AboutController = {
  getAbout,
  updateAbout,
};
