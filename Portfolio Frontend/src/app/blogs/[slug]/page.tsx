import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Blog } from '@/types';
import Image from 'next/image';

interface PageProps {
  params: { slug: string };
}

export default async function BlogPage({ params }: PageProps) {
  try {
    const blogResponse = await api.blogs.getBySlug(params.slug);

    if (!blogResponse.success || !blogResponse.data) {
      notFound();
    }

    const blog: Blog = blogResponse.data;

    return (
      <article className="container max-w-4xl py-16">
        <header className="mb-8">
          {blog.imageUrl && (
            <div className="mb-8">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
              </Avatar>
              <span>{blog.author.name}</span>
            </div>
            <span>•</span>
            <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
          </div>

          {blog.excerpt && (
            <p className="text-xl text-muted-foreground mt-4">{blog.excerpt}</p>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    );
  } catch (error) {
    console.error('Error loading blog:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const blogsResponse = await api.blogs.getAll(1, 50);

    if (!blogsResponse.success || !blogsResponse.data) {
      return [];
    }

    const blogs = (blogsResponse.data as any).blogs || blogsResponse.data || [];

    if (!Array.isArray(blogs)) {
      return [];
    }

    return blogs.map((blog: Blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
  try {
    const blogResponse = await api.blogs.getBySlug(params.slug);

    if (!blogResponse.success || !blogResponse.data) {
      return {
        title: 'Blog Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    const blog = blogResponse.data;

    return {
      title: blog.title,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: blog.imageUrl ? [{ url: blog.imageUrl }] : [],
        type: 'article',
        publishedTime: blog.createdAt,
        authors: [blog.author.name],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post',
      description: 'Personal blog post',
    };
  }
}
