export default function BlogLoading() {
  return (
    <div className="container max-w-4xl py-16 space-y-8">
      <div className="space-y-4">
        <div className="h-12 bg-muted rounded w-3/4"></div>
        <div className="flex gap-4">
          <div className="h-6 bg-muted rounded w-32"></div>
          <div className="h-6 bg-muted rounded w-24"></div>
        </div>
        <div className="h-6 bg-muted rounded w-full"></div>
      </div>
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded w-full"></div>
        ))}
      </div>
    </div>
  );
}
