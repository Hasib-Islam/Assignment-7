import { api } from '@/lib/api';
import ProjectGrid from '@/components/project/project-grid';
import { Project } from '@/types';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    const response = await api.projects.getAll();

    if (response.success && response.data) {
      const projectsData = response.data;

      if (Array.isArray(projectsData)) {
        projects = projectsData;
      } else if (
        projectsData &&
        'data' in projectsData &&
        Array.isArray(projectsData.data)
      ) {
        projects = projectsData.data;
      }
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          My Projects
        </h1>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
