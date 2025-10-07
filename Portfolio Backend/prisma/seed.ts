import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { logger } from '../src/utils/logger';

const prisma = new PrismaClient();

async function main() {
  logger.info('Starting database seed...');

  const adminEmail = 'admin@portfolio.com';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    logger.info('Admin user already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 12);

  const adminUser = await prisma.user.create({
    data: {
      name: 'Portfolio Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  logger.info('Admin user created successfully');
  logger.info(`Email: ${adminUser.email}`);
  logger.info('Password: admin123');
  logger.info('Remember to change the password after first login!');

  const sampleBlogs = [
    {
      title: 'Welcome to My Portfolio',
      content: 'This is my first blog post on my new portfolio website...',
      excerpt:
        'An introduction to my portfolio and what you can expect to find here.',
      slug: 'welcome-to-my-portfolio',
      published: true,
      authorId: adminUser.id,
    },
    {
      title: 'Building Modern Web Applications',
      content:
        'In this post, I discuss the technologies and approaches I use...',
      excerpt:
        'Exploring modern web development technologies and best practices.',
      slug: 'building-modern-web-applications',
      published: true,
      authorId: adminUser.id,
    },
  ];

  for (const blog of sampleBlogs) {
    await prisma.blog.create({
      data: blog,
    });
  }

  logger.info('Sample blog posts created');

  const sampleProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React and Node.js',
      content: 'Detailed description of the e-commerce platform...',
      slug: 'ecommerce-platform',
      imageUrl:
        'https://res-console.cloudinary.com/drtdlsnmp/thumbnails/v1/image/upload/v1759661708/cG9ydGZvbGlvL3NkaHRpd2h1ZW1pd3ZuMHdyY2p1/drilldown',
      liveUrl: 'https://demo-ecommerce.example.com',
      githubUrl: 'https://github.com/username/ecommerce',
      featured: true,
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      authorId: adminUser.id,
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application',
      content: 'Detailed description of the task management app...',
      slug: 'task-manager',
      imageUrl:
        'https://res-console.cloudinary.com/drtdlsnmp/thumbnails/v1/image/upload/v1759661693/cG9ydGZvbGlvL3IzdWZ5YnVvbnd4am5pNnZmd2F0/drilldown',
      liveUrl: 'https://demo-tasks.example.com',
      githubUrl: 'https://github.com/username/taskapp',
      featured: false,
      tags: ['Next', 'Express', 'PostgreSQL'],
      authorId: adminUser.id,
    },
  ];

  for (const project of sampleProjects) {
    await prisma.project.create({
      data: project,
    });
  }

  logger.info('Sample projects created');
  logger.info('Database seeding completed!');
}

main()
  .catch((e) => {
    logger.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
