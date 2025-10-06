import { api } from '@/lib/api';
import { Hero } from '@/components/shared/hero';
import ProjectGrid from '@/components/project/project-grid';
import BlogList from '@/components/blog/blog-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Blog, Project, BlogsResponse } from '@/types';

export default async function HomePage() {
  let featuredProjects: Project[] = [];
  let recentBlogs: Blog[] = [];

  try {
    const [featuredProjectsResponse, recentBlogsResponse] =
      await Promise.allSettled([
        api.projects.getFeatured(),
        api.blogs.getAll(1, 3),
      ]);

    if (
      featuredProjectsResponse.status === 'fulfilled' &&
      featuredProjectsResponse.value.success &&
      featuredProjectsResponse.value.data
    ) {
      featuredProjects = Array.isArray(featuredProjectsResponse.value.data)
        ? featuredProjectsResponse.value.data
        : [];
    }

    if (
      recentBlogsResponse.status === 'fulfilled' &&
      recentBlogsResponse.value.success &&
      recentBlogsResponse.value.data
    ) {
      const blogsData = recentBlogsResponse.value.data;

      if (blogsData && 'blogs' in blogsData) {
        recentBlogs = (blogsData as BlogsResponse).blogs || [];
      } else if (Array.isArray(blogsData)) {
        recentBlogs = blogsData;
      }
    }
  } catch (error) {
    console.error('Error fetching data for home page:', error);
  }

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
          <ProjectGrid projects={featuredProjects} />
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
          <BlogList blogs={recentBlogs} />
        </div>
      </section>
    </>
  );
}
