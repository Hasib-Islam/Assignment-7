'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, JPEG, WEBP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.upload.image(formData);

      if (response.success && response.data) {
        onChange(response.data.imageUrl);
        toast.success('Image uploaded successfully');
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  const isValidImageUrl =
    value && (value.startsWith('http') || value.startsWith('/'));

  return (
    <div className="space-y-4">
      {value && isValidImageUrl ? (
        <div className="relative group">
          <div className="border rounded-lg p-4">
            <div className="relative aspect-video w-full max-w-md mx-auto">
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="object-cover rounded-lg"
                onError={(e) => {
                  console.error('Image failed to load:', value);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
              >
                <X className="w-4 h-4 mr-2" />
                Remove Image
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Image
              </Button>
            </div>
          </div>
        </div>
      ) : value ? (
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Image URL:</p>
          <p className="text-sm break-all bg-muted p-2 rounded">{value}</p>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="mt-4"
            onClick={handleRemove}
          >
            <X className="w-4 h-4 mr-2" />
            Remove Image
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="w-12 h-12 text-muted-foreground" />
            <div className="space-y-2">
              <Label
                htmlFor="image-upload"
                className="text-lg font-medium cursor-pointer"
              >
                Upload Image
              </Label>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
            <Input
              id="image-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
