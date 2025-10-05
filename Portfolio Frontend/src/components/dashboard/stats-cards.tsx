import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Eye, Star } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalBlogs: number;
    totalProjects: number;
    publishedBlogs: number;
    featuredProjects: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      icon: FileText,
      description: `${stats.publishedBlogs} published`,
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: Briefcase,
      description: `${stats.featuredProjects} featured`,
    },
    {
      title: 'Published Blogs',
      value: stats.publishedBlogs,
      icon: Eye,
      description: 'Visible to public',
    },
    {
      title: 'Featured Projects',
      value: stats.featuredProjects,
      icon: Star,
      description: 'Highlighted projects',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
