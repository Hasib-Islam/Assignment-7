import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Hi, I&apos;m Hasib
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building modern web applications with React, Next.js, and
              TypeScript. Passionate about creating exceptional user
              experiences.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
