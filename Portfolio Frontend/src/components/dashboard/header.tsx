'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Plus } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const getCreateButton = () => {
    if (pathname.includes('/blogs')) {
      return (
        <Button onClick={() => router.push('/dashboard/blogs/new')}>
          <Plus className="w-4 h-4 mr-2" />
          New Blog
        </Button>
      );
    }
    if (pathname.includes('/projects')) {
      return (
        <Button onClick={() => router.push('/dashboard/projects/new')}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      );
    }
    return null;
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {pathname.includes('/blogs') && 'Blog Management'}
            {pathname.includes('/projects') && 'Project Management'}
            {pathname === '/dashboard' && 'Dashboard'}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {getCreateButton()}
        </div>
      </div>
    </header>
  );
}
