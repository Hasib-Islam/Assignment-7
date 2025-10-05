export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Portfolio. All rights reserved
              by{' '}
              <a
                className="font-semibold underline text-blue-500"
                href="https://github.com/Hasib-Islam"
              >
                Hasib Islam
              </a>
              .
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
