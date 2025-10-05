import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { cloudinary } from '../../lib/cloudinary';

const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'No image file provided',
        data: null,
      });
    }

    const file = req.file as Express.Multer.File;

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(file.buffer);
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to upload image';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

export const UploadController = {
  uploadImage,
};
