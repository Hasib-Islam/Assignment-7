import { Request, Response } from 'express';
import { BlogService } from './blog.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { AuthRequest } from '../../middleware/auth.middleware';

const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await BlogService.getAllBlogs(page, limit);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blogs retrieved successfully',
      data: result.blogs,
      meta: result.meta,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to retrieve blogs';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await BlogService.getBlogById(id);

    if (!blog) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Blog not found',
        data: null,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog retrieved successfully',
      data: blog,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to retrieve blog';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await BlogService.getBlogBySlug(slug);

    if (!blog) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Blog not found',
        data: null,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog retrieved successfully',
      data: blog,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to retrieve blog';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const createBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blogData = req.body;
    const authorId = req.user.id;

    const blog = await BlogService.createBlog(blogData, authorId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create blog';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const updateBlog = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const blogData = req.body;

    const blog = await BlogService.updateBlog(id, blogData);

    if (!blog) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Blog not found',
        data: null,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update blog';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const deleteBlog = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await BlogService.deleteBlog(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog deleted successfully',
      data: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to delete blog';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

export const BlogController = {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
