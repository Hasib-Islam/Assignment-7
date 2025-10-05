import { api } from '@/lib/api';
import { BlogForm } from '@/components/blog/blog-form';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

export default async function EditBlogPage({ params }: PageProps) {
  const blogResponse = await api.blogs.getBySlug(params.slug);
  const blog = blogResponse.data;

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <p className="text-muted-foreground">
          Update your blog post: {blog.title}
        </p>
      </div>

      <BlogForm initialData={blog} />
    </div>
  );
}
