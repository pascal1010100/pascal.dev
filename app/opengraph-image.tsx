import { ImageResponse } from 'next/og';
import { blogPosts } from '@/data/blog';
import { BASE_URL } from '@/lib/constants';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug?: string[] } }) {
  // Default OG image for the blog home
  let title = 'Pascal Dev';
  let description = 'Blog sobre desarrollo web, programación y tecnología';
  let imageUrl = `${BASE_URL}/images/og-default.jpg`;

  // If it's a blog post
  if (params?.slug?.[0] === 'blog' && params.slug[1]) {
    const post = blogPosts.find((p) => p.slug === params.slug[1]);
    if (post) {
      title = post.title;
      description = post.description;
      if (post.image) {
        imageUrl = post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`;
      }
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '5rem',
          position: 'relative',
          color: 'white',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        />
        
        {/* Content */}
        <div style={{ position: 'relative', maxWidth: '800px' }}>
          <h1
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '1.5rem',
              opacity: 0.9,
              marginBottom: '2rem',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                backgroundColor: '#3b82f6',
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
              }}
            >
              pascal.dev
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
