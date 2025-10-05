import { prisma } from '../../lib/prisma';
import { CreateProjectInput, UpdateProjectInput } from './project.routes';

const getAllProjects = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.project.count(),
  ]);

  return {
    projects,
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getFeaturedProjects = async () => {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const getProjectById = async (id: string) => {
  return prisma.project.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const getProjectBySlug = async (slug: string) => {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const generateSlug = async (title: string): Promise<string> => {
  let baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let count = 1;

  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
};

const createProject = async (data: CreateProjectInput, authorId: string) => {
  let slug = await generateSlug(data.title);

  return prisma.project.create({
    data: {
      ...data,
      slug,
      authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const updateProject = async (id: string, data: UpdateProjectInput) => {
  return prisma.project.update({
    where: { id },
    data,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const deleteProject = async (id: string) => {
  return prisma.project.delete({
    where: { id },
  });
};

export const ProjectService = {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
