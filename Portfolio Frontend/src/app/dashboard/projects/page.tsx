import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, ExternalLink, Github, Plus } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { DeleteProjectButton } from '@/components/dashboard/delete-project-button';
import { Project } from '@/types';

export const dynamic = 'force-dynamic';

export default async function DashboardProjectsPage() {
  let projects: Project[] = [];

  try {
    const response = await api.projects.getAll();
    if (response.success && response.data) {
      projects = Array.isArray(response.data) ? response.data : [];
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project: Project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  <Badge variant={project.featured ? 'default' : 'secondary'}>
                    {project.featured ? 'Featured' : 'Regular'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {project.tags.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatDate(project.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/projects/${project.slug}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <DeleteProjectButton
                      projectId={project.id}
                      projectTitle={project.title}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No projects found.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/projects/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Project
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
