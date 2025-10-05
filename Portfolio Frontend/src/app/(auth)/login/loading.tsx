export default function LoginLoading() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="h-8 bg-muted rounded w-32 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-16"></div>
            <div className="h-10 bg-muted rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-20"></div>
            <div className="h-10 bg-muted rounded w-full"></div>
          </div>
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
