import { StatsCards } from '@/components/dashboard/stats-cards';
import { api } from '@/lib/api';
import { Blog, Project, BlogsResponse } from '@/types';

const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

export default async function DashboardPage() {
  let blogs: Blog[] = [];
  let projects: Project[] = [];

  if (!isBuildTime) {
    try {
      const [blogsResponse, projectsResponse] = await Promise.all([
        api.blogs.getAll(1, 5),
        api.projects.getAll(),
      ]);

      if (blogsResponse.success && blogsResponse.data) {
        const blogsData = blogsResponse.data;
        if (Array.isArray(blogsData)) {
          blogs = blogsData;
        } else if (blogsData && 'blogs' in blogsData) {
          blogs = (blogsData as BlogsResponse).blogs || [];
        }
      }

      if (projectsResponse.success && projectsResponse.data) {
        projects = Array.isArray(projectsResponse.data)
          ? projectsResponse.data
          : [];
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }

  const stats = {
    totalBlogs: blogs.length,
    totalProjects: projects.length,
    publishedBlogs: blogs.filter((blog: Blog) => blog.published).length,
    featuredProjects: projects.filter((project: Project) => project.featured)
      .length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portfolio dashboard
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
          {blogs.length > 0 ? (
            <div className="space-y-3">
              {blogs.slice(0, 3).map((blog: Blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div>
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {blog.published ? 'Published' : 'Draft'} •{' '}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No blogs found
            </p>
          )}
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.slice(0, 3).map((project: Project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.featured ? 'Featured' : 'Project'} •{' '}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No projects found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
