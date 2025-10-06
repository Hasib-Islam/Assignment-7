import { api } from '@/lib/api';
import { AboutForm } from '@/components/about/about-form';

const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

export default async function DashboardAboutPage() {
  let about = null;

  if (!isBuildTime) {
    try {
      const aboutResponse = await api.about.get();
      about = aboutResponse.data;
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit About Page</h1>
        <p className="text-muted-foreground">
          Update your personal information and bio
        </p>
      </div>

      <AboutForm initialData={about || undefined} />
    </div>
  );
}
