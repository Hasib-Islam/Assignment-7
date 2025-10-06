import prisma from '../../lib/prisma';
import { UpdateAboutInput } from './about.routes';

const getAbout = async () => {
  let about = await prisma.about.findUnique({
    where: { id: 'about' },
  });

  if (!about) {
    about = await prisma.about.create({
      data: {
        id: 'about',
        name: 'Your Name',
        bio: 'Your bio goes here...',
        email: 'your.email@example.com',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
        experience: [],
      },
    });
  }

  return about;
};

const updateAbout = async (data: UpdateAboutInput) => {
  return prisma.about.upsert({
    where: { id: 'about' },
    update: data,
    create: {
      id: 'about',
      ...data,
    },
  });
};

export const AboutService = {
  getAbout,
  updateAbout,
};
