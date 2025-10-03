// Base URL for the website (used for generating absolute URLs)
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pascal.dev';

// Default metadata for the site
export const SITE_NAME = 'Pascal Dev';
export const SITE_DESCRIPTION = 'Blog sobre desarrollo web, programación y tecnología';
export const SITE_KEYWORDS = [
  'desarrollo web',
  'programación',
  'tecnología',
  'javascript',
  'typescript',
  'react',
  'nextjs',
  'nodejs',
  'frontend',
  'backend',
  'fullstack',
];

// Pagination settings
export const POSTS_PER_PAGE = 6;
export const RELATED_POSTS_LIMIT = 3;

// Social media links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pascaldev',
  github: 'https://github.com/pascaldev',
  linkedin: 'https://linkedin.com/company/pascaldev',
};

// Default OG image
// Update this path to your actual default OG image
// Make sure to add the image to your public folder
export const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`;

// Default author information
export const DEFAULT_AUTHOR = {
  name: 'Equipo Pascal',
  avatar: '/images/avatar.jpg', // Update this path to your actual avatar
  twitter: '@pascaldev',
};

// Default theme colors for the site
export const THEME_COLORS = {
  primary: '#3b82f6', // blue-500
  secondary: '#8b5cf6', // violet-500
  accent: '#ec4899', // pink-500
  background: '#030712', // gray-950
  foreground: '#f9fafb', // gray-50
  muted: '#1f2937', // gray-800
  'muted-foreground': '#9ca3af', // gray-400
  card: '#111827', // gray-900
  'card-foreground': '#f9fafb', // gray-50
  popover: '#111827', // gray-900
  'popover-foreground': '#f9fafb', // gray-50
  border: '#1f2937', // gray-800
  input: '#1f2937', // gray-800
  ring: '#3b82f6', // blue-500
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
