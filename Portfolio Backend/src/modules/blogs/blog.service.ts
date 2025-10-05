import { prisma } from '../../lib/prisma';
import { CreateBlogInput, UpdateBlogInput } from './blog.routes';

const getAllBlogs = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
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
    prisma.blog.count(),
  ]);

  return {
    blogs,
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getBlogById = async (id: string) => {
  return prisma.blog.findUnique({
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

const getBlogBySlug = async (slug: string) => {
  return prisma.blog.findUnique({
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

const createBlog = async (data: CreateBlogInput, authorId: string) => {
  return prisma.blog.create({
    data: {
      ...data,
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

const updateBlog = async (id: string, data: UpdateBlogInput) => {
  return prisma.blog.update({
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

const deleteBlog = async (id: string) => {
  return prisma.blog.delete({
    where: { id },
  });
};

export const BlogService = {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
