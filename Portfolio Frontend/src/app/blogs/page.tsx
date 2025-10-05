import { api } from '@/lib/api';
import BlogList from '@/components/blog/blog-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function BlogsPage() {
  let blogs = [];
  try {
    const response = await api.blogs.getAll();
    blogs = response.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
          <Link href="/blogs/create">
            <Button>Create New Blog</Button>
          </Link>
        </div>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}
