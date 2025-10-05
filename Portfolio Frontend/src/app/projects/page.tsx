import { api } from '@/lib/api';
import ProjectGrid from '@/components/project/project-grid';

export default async function ProjectsPage() {
  let projects = [];
  try {
    const response = await api.projects.getAll();
    projects = response.data || [];
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
