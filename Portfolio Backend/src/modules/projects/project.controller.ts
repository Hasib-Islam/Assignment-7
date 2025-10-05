import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { AuthRequest } from '../../middleware/auth.middleware';

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await ProjectService.getAllProjects(page, limit);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Projects retrieved successfully',
      data: result.projects,
      meta: result.meta,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to retrieve projects';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const getFeaturedProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getFeaturedProjects();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Featured projects retrieved successfully',
      data: projects,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to retrieve featured projects';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);

    if (!project) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Project not found',
        data: null,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Project retrieved successfully',
      data: project,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to retrieve project';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await ProjectService.getProjectBySlug(slug);

    if (!project) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Project not found',
        data: null,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Project retrieved successfully',
      data: project,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to retrieve project';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const projectData = req.body;
    const authorId = req.user.id;

    const project = await ProjectService.createProject(projectData, authorId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create project';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const projectData = req.body;

    const project = await ProjectService.updateProject(id, projectData);

    if (!project) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Project not found',
        data: null,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update project';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await ProjectService.deleteProject(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Project deleted successfully',
      data: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to delete project';
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      data: null,
    });
  }
};

export const ProjectController = {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
