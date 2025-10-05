import { api } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { About } from '@/types';
import Image from 'next/image';

export default async function AboutPage() {
  const aboutResponse = await api.about.get();
  const about: About = aboutResponse.data;

  return (
    <div className="container py-16">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                {about.imageUrl ? (
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src={about.imageUrl}
                      alt={about.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src="/avatar.jpg" alt={about.name} />
                    <AvatarFallback className="text-2xl">
                      {about.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <h1 className="text-2xl font-bold">{about.name}</h1>
                <p className="text-muted-foreground mt-2">{about.bio}</p>

                <div className="mt-6 space-y-3 w-full">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4" />
                    <span>{about.email}</span>
                  </div>
                  {about.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4" />
                      <span>{about.phone}</span>
                    </div>
                  )}
                  {about.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4" />
                      <span>{about.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {about.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.duration}
                    </p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
