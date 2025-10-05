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
import { projectSchema, type ProjectFormData } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';

interface ProjectFormProps {
  initialData?: ProjectFormData & { id: string };
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          content: initialData.content,
          imageUrl: initialData.imageUrl || '',
          liveUrl: initialData.liveUrl || '',
          githubUrl: initialData.githubUrl || '',
          featured: initialData.featured,
          tags: initialData.tags,
          slug: initialData.slug,
        }
      : {
          title: '',
          description: '',
          content: '',
          imageUrl: '',
          liveUrl: '',
          githubUrl: '',
          featured: false,
          tags: [],
          slug: '',
        },
  });

  const title = watch('title');
  const imageUrl = watch('imageUrl');

  const generateSlugFromTitle = () => {
    if (title && !initialData) {
      setValue('slug', generateSlug(title));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);

    try {
      let response;
      if (initialData?.id) {
        response = await api.projects.update(initialData.id, data);
      } else {
        response = await api.projects.create(data);
      }

      if (!response.success) {
        throw new Error(response.message || 'Operation failed');
      }

      toast.success(
        initialData
          ? 'Project updated successfully!'
          : 'Project created successfully!'
      );
      router.push('/dashboard/projects');
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
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register('description')} rows={3} />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Project Details</Label>
          <RichEditor
            value={watch('content')}
            onChange={(value) => setValue('content', value)}
          />
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Project Image</Label>
          <ImageUpload
            value={imageUrl}
            onChange={(url) => setValue('imageUrl', url)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live Demo URL</Label>
            <Input
              id="liveUrl"
              {...register('liveUrl')}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              {...register('githubUrl')}
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add a tag and press Enter"
            />
            <Button type="button" onClick={addTag} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-muted-foreground hover:text-foreground ml-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            {...register('featured')}
            onCheckedChange={(checked) => setValue('featured', !!checked)}
          />
          <Label
            htmlFor="featured"
            className="text-sm font-medium leading-none"
          >
            Feature this project
          </Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? 'Saving...'
            : initialData
            ? 'Update Project'
            : 'Create Project'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
