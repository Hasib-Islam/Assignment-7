import { api } from '@/lib/api';
import BlogList from '@/components/blog/blog-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Blog } from '@/types';

interface BlogsApiResponse {
  data?: Blog[];
  blogs?: Blog[];
  meta?: unknown;
}

export default async function BlogsPage() {
  let blogs: Blog[] = [];

  try {
    const response = await api.blogs.getAll();

    if (response.success && response.data) {
      const blogsData = response.data;

      if (Array.isArray(blogsData)) {
        blogs = blogsData;
      } else {
        const data = blogsData as BlogsApiResponse;

        if ('blogs' in data && Array.isArray(data.blogs)) {
          blogs = data.blogs;
        } else if ('data' in data && Array.isArray(data.data)) {
          blogs = data.data;
        }
      }
    }
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
