import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Plus } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { DeleteBlogButton } from '@/components/dashboard/delete-blog-button';

export default async function DashboardBlogsPage() {
  try {
    const response = await api.blogs.getAll(1, 50);

    let blogs = [];
    if (response.success && response.data) {
      blogs = (response.data as any).blogs || response.data || [];
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">
              Create and manage your blog posts
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/blogs/new">
              <Plus className="w-4 h-4 mr-2" />
              New Blog
            </Link>
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(blogs) &&
                blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>
                      <Badge variant={blog.published ? 'default' : 'secondary'}>
                        {blog.published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(blog.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/blogs/${blog.slug}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/blogs/${blog.slug}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <DeleteBlogButton
                          blogId={blog.id}
                          blogTitle={blog.title}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {(!Array.isArray(blogs) || blogs.length === 0) && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No blogs found.</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/blogs/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Blog
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading blogs:', error);
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">
              Create and manage your blog posts
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/blogs/new">
              <Plus className="w-4 h-4 mr-2" />
              New Blog
            </Link>
          </Button>
        </div>
        <div className="text-center py-8 border rounded-lg">
          <p className="text-destructive">
            Failed to load blogs. Please try again.
          </p>
        </div>
      </div>
    );
  }
}
