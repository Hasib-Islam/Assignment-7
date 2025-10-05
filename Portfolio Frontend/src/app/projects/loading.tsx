export default function ProjectsLoading() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <div className="h-12 bg-muted rounded w-64 mx-auto mb-4"></div>
        <div className="h-6 bg-muted rounded w-96 mx-auto"></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-muted rounded w-20"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
