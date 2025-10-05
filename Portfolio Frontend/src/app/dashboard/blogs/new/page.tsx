import { BlogForm } from '@/components/blog/blog-form';

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Blog</h1>
        <p className="text-muted-foreground">
          Write a new blog post for your portfolio
        </p>
      </div>

      <BlogForm />
    </div>
  );
}
