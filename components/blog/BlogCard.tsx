import Link from 'next/link';
import Image from 'next/image';
import { Clock, MessageSquare } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col space-y-4 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 opacity-0 blur-sm transition-all group-hover:opacity-100" />
      
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="text-xs font-medium text-primary">{post.category}</span>
          <span className="text-gray-600">•</span>
          <time dateTime={post.date} className="flex items-center">
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <h2 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span className="flex items-center text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {post.readTime}
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center text-muted-foreground">
              <MessageSquare className="mr-1 h-4 w-4" />
              0 comentarios
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
