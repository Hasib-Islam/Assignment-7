import { api } from '@/lib/api';
import { BlogForm } from '@/components/blog/blog-form';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blogResponse = await api.blogs.getBySlug(slug);
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
