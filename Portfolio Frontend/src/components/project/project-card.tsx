'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    technologies?: string[];
    githubUrl?: string;
    liveUrl?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getImageSrc = () => {
    if (imageError || !project?.imageUrl) {
      return getFallbackImage();
    }

    let imageUrl = project.imageUrl;

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
      console.error('Invalid image URL:', project.imageUrl, error);
      return getFallbackImage();
    }
  };

  const getFallbackImage = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle" dy=".3em">Project Image</text>
      </svg>
    `)}`;
  };

  const imageSrc = getImageSrc();

  if (!project) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6 border">
        <p className="text-muted-foreground">No project data</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={imageSrc}
          alt={project.title || 'Project image'}
          fill
          className={`object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={() => {
            console.error('Project image failed to load:', project.imageUrl);
            setImageError(true);
            setImageLoading(false);
          }}
          onLoad={() => {
            setImageLoading(false);
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={imageSrc.startsWith('data:image/svg+xml')}
        />
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-pulse text-muted-foreground">
              Loading...
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          {project.title || 'Untitled Project'}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description || 'No description available'}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-primary/10 text-primary text-sm rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex space-x-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
