import { StatsCards } from '@/components/dashboard/stats-cards';
import { api } from '@/lib/api';

export default async function DashboardPage() {
  const [blogsResponse, projectsResponse] = await Promise.all([
    api.blogs.getAll(1, 5),
    api.projects.getAll(),
  ]);

  const blogs = blogsResponse.data || [];
  const projects = projectsResponse.data || [];

  const stats = {
    totalBlogs: blogsResponse.meta?.total || blogs.length,
    totalProjects: projects.length,
    publishedBlogs: blogs.filter((blog) => blog.published).length,
    featuredProjects: projects.filter((project) => project.featured).length,
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
              {blogs.slice(0, 3).map((blog) => (
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
              {projects.slice(0, 3).map((project) => (
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
