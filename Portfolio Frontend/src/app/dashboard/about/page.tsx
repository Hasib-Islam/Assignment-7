import { api } from '@/lib/api';
import { AboutForm } from '@/components/about/about-form';

export default async function DashboardAboutPage() {
  const aboutResponse = await api.about.get();
  const about = aboutResponse.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit About Page</h1>
        <p className="text-muted-foreground">
          Update your personal information and bio
        </p>
      </div>

      <AboutForm initialData={about} />
    </div>
  );
}
