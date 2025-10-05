'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    createdAt?: string;
    slug?: string;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getImageSrc = () => {
    if (imageError || !blog.imageUrl) {
      return getFallbackImage();
    }

    let imageUrl = blog.imageUrl;

    try {
      if (imageUrl.startsWith('/')) {
        imageUrl = `http://localhost:5000${imageUrl}`;
      } else if (
        !imageUrl.startsWith('http://') &&
        !imageUrl.startsWith('https://') &&
        imageUrl.includes('.')
      ) {
        imageUrl = `https://${imageUrl}`;
      }

      new URL(imageUrl);

      return imageUrl;
    } catch (error) {
      console.error('Invalid blog image URL:', blog.imageUrl, error);
      return getFallbackImage();
    }
  };

  const getFallbackImage = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle" dy=".3em">Blog Image</text>
      </svg>
    `)}`;
  };

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={getImageSrc()}
          alt={blog.title || 'Blog image'}
          fill
          className={`object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={getImageSrc().startsWith('data:image/svg+xml')}
        />
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-pulse text-muted-foreground">
              Loading...
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          {blog.title || 'Untitled Blog'}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {blog.description || 'No description available'}
        </p>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : 'Unknown date'}
          </span>
          <a
            href={`/blogs/${blog.slug || blog.id}`}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
}
