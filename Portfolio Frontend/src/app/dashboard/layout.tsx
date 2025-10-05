import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ThemeProvider } from '@/components/theme-provider';
import { ProtectedRoute } from '@/components/protected-route';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
        <div className="flex h-screen bg-background">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
