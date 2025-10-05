'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RichEditor } from '@/components/shared/rich-editor';
import { ImageUpload } from '@/components/shared/image-upload';
import { api } from '@/lib/api';
import { blogSchema, type BlogFormData } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';

interface BlogFormProps {
  initialData?: BlogFormData & { id: string };
}

export function BlogForm({ initialData }: BlogFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          content: initialData.content,
          excerpt: initialData.excerpt || '',
          slug: initialData.slug,
          published: initialData.published,
          imageUrl: initialData.imageUrl || '',
        }
      : {
          title: '',
          content: '',
          excerpt: '',
          slug: '',
          published: false,
          imageUrl: '',
        },
  });

  const title = watch('title');
  const content = watch('content');
  const imageUrl = watch('imageUrl');

  const generateSlugFromTitle = () => {
    if (title && !initialData) {
      const baseSlug = generateSlug(title);
      const uniqueSlug = `${baseSlug}-${Date.now()}`;
      setValue('slug', uniqueSlug);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsLoading(true);

    try {
      let response;
      if (initialData?.id) {
        response = await api.blogs.update(initialData.id, data);
      } else {
        response = await api.blogs.create(data);
      }

      if (!response.success) {
        throw new Error(response.message || 'Operation failed');
      }

      toast.success(
        initialData
          ? 'Blog updated successfully!'
          : 'Blog created successfully!'
      );
      router.push('/dashboard/blogs');
      router.refresh();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register('title')}
            onBlur={generateSlugFromTitle}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" {...register('slug')} />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" {...register('excerpt')} rows={3} />
          {errors.excerpt && (
            <p className="text-sm text-destructive">{errors.excerpt.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Featured Image (Optional)</Label>
          <ImageUpload
            value={imageUrl}
            onChange={(url) => setValue('imageUrl', url)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <RichEditor
            value={content}
            onChange={(value) => setValue('content', value)}
          />
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="published"
            {...register('published')}
            onCheckedChange={(checked) => setValue('published', !!checked)}
          />
          <Label htmlFor="published">Publish this blog post</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? 'Saving...'
            : initialData
            ? 'Update Blog'
            : 'Create Blog'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
