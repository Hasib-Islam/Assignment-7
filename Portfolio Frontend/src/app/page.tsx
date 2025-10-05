import { api } from '@/lib/api';
import { Hero } from '@/components/shared/hero';
import ProjectGrid from '@/components/project/project-grid';
import BlogList from '@/components/blog/blog-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  const [featuredProjectsResponse, recentBlogsResponse] = await Promise.all([
    api.projects.getFeatured(),
    api.blogs.getAll(1, 3),
  ]);

  const featuredProjects = featuredProjectsResponse.data || [];

  const recentBlogs = recentBlogsResponse.data || [];

  const mappedBlogs = recentBlogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    description: blog.excerpt,
    imageUrl: blog.imageUrl,
    createdAt: blog.createdAt,
    slug: blog.slug,
  }));

  const mappedProjects = featuredProjects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl,
    technologies: project.tags,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
  }));

  return (
    <>
      <Hero />

      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <p className="text-muted-foreground mt-2">
                Some of my recent work and personal projects
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
          <ProjectGrid projects={mappedProjects} />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Recent Blog Posts</h2>
              <p className="text-muted-foreground mt-2">
                Thoughts, tutorials, and insights
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/blogs">View All Blogs</Link>
            </Button>
          </div>
          <BlogList blogs={mappedBlogs} />
        </div>
      </section>
    </>
  );
}
