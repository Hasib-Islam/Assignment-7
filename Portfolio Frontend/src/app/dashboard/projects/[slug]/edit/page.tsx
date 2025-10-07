import { api } from '@/lib/api';
import { ProjectForm } from '@/components/project/project-form';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const projectResponse = await api.projects.getBySlug(slug);

    if (!projectResponse.success || !projectResponse.data) {
      notFound();
    }

    const project = projectResponse.data;

    const initialData = {
      id: project.id,
      title: project.title,
      description: project.description,
      content: project.content,
      slug: project.slug,
      imageUrl: project.imageUrl || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
      tags: project.tags,
    };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Project</h1>
          <p className="text-muted-foreground">
            Update your project: {project.title}
          </p>
        </div>

        <ProjectForm initialData={initialData} />
      </div>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    notFound();
  }
}
