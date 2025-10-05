'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  LogOut,
  User,
} from 'lucide-react';

const routes = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Blogs',
    href: '/dashboard/blogs',
    icon: FileText,
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    icon: Briefcase,
  },
  {
    label: 'About',
    href: '/dashboard/about',
    icon: User,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="relative w-64 bg-background border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold">Portfolio Admin</h1>
      </div>

      <nav className="space-y-2 p-4">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Button
              key={route.href}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn('w-full justify-start', isActive && 'bg-secondary')}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="w-4 h-4 mr-2" />
                {route.label}
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
