import * as React from 'react';
import { LucideProps, icons as lucideIcons, LucideIcon } from 'lucide-react';

// Re-export all Lucide icons
export * from 'lucide-react';

// Brand name mappings (common typos/variations to correct icon names)
const BRAND_ALIASES: Record<string, string> = {
  github: 'Github',
  gitHub: 'Github',
  GitHub: 'Github',
  youtube: 'Youtube',
  youTube: 'Youtube',
  YouTube: 'Youtube',
  linkedin: 'Linkedin',
  linkedIn: 'Linkedin',
  LinkedIn: 'Linkedin',
  whatsapp: 'Whatsapp',
  whatsApp: 'Whatsapp',
  WhatsApp: 'Whatsapp',
  // Add other common brand name variations here
};

// Custom icons can be added here
export const Logo = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

// Fallback component for missing icons
const FallbackIcon = (props: LucideProps) => (
  <div 
    className="inline-flex items-center justify-center text-muted-foreground"
    style={{
      width: props.size || 24,
      height: props.size || 24,
      ...props.style
    }}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  </div>
);

// Common icon aliases
const ICON_ALIASES: Record<string, string> = {
  // Navigation
  close: 'X',
  menu: 'Menu',
  search: 'Search',
  
  // Arrows
  chevronDown: 'ChevronDown',
  chevronRight: 'ChevronRight',
  chevronUp: 'ChevronUp',
  chevronLeft: 'ChevronLeft',
  arrowRight: 'ArrowRight',
  arrowLeft: 'ArrowLeft',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  
  // Common UI
  externalLink: 'ExternalLink',
  mail: 'Mail',
  moon: 'Moon',
  sun: 'Sun',
  
  // Resource section
  tool: 'Wrench',
  library: 'Library',
  book: 'BookOpen',
  layout: 'LayoutTemplate',
  'graduation-cap': 'GraduationCap',
  users: 'Users',
  package: 'Package',
  code: 'Code2',
  terminal: 'Terminal',
  database: 'Database',
  server: 'Server',
  cpu: 'Cpu',
  zap: 'Zap',
  flame: 'Flame',
  star: 'Star',
  heart: 'Heart',
  thumbsUp: 'ThumbsUp',
  messageSquare: 'MessageSquare',
  share: 'Share2',
  download: 'Download',
  upload: 'Upload',
  settings: 'Settings',
  user: 'User',
  users2: 'Users2',
  helpCircle: 'HelpCircle',
  info: 'Info',
  alertCircle: 'AlertCircle',
  checkCircle: 'CheckCircle2',
  xCircle: 'XCircle',
  plus: 'Plus',
  minus: 'Minus',
  trash: 'Trash2',
  edit: 'Pencil',
  copy: 'Copy',
  link: 'Link',
  calendar: 'Calendar',
  clock: 'Clock',
  filter: 'Filter',
  grid: 'LayoutGrid',
  list: 'List',
  columns: 'Columns',
  moreHorizontal: 'MoreHorizontal',
  moreVertical: 'MoreVertical',
  
  // Add more aliases as needed
};

// Get icon by name with fallback support
export function getIcon(name: string): React.ComponentType<LucideProps> {
  if (!name) return FallbackIcon;
  
  // Check brand name aliases first, then icon aliases
  const normalizedKey = BRAND_ALIASES[name] || ICON_ALIASES[name] || name;
  
  // Try to get the icon from lucideIcons (case-insensitive)
  const iconKey = Object.keys(lucideIcons).find(
    key => key.toLowerCase() === normalizedKey.toLowerCase()
  );
  
  if (iconKey) {
    return lucideIcons[iconKey as keyof typeof lucideIcons];
  }
  
  // Fallback to FileCode for missing icons
  return lucideIcons.FileCode || FallbackIcon;
}

// Component that dynamically renders icons
export const Icons: Record<string, React.ComponentType<LucideProps>> = new Proxy({} as Record<string, React.ComponentType<LucideProps>>, {
  get(target, prop) {
    const name = String(prop);
    
    // Return the Logo component for the 'logo' key
    if (name === 'logo') {
      return Logo;
    }
    
    // Try to get the icon using getIcon
    return getIcon(name);
  },
  
  // This ensures Object.keys() and other methods work correctly
  ownKeys() {
    return ['logo', ...Object.keys(lucideIcons)];
  },
  
  // This is needed for the Proxy to work with TypeScript
  getOwnPropertyDescriptor() {
    return {
      value: true,
      enumerable: true,
      configurable: true
    };
  }
});

// React component for easier usage in JSX
type IconProps = LucideProps & {
  name: string;
};

export const IconByName: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = getIcon(name);
  return <IconComponent {...props} />;
};

export default Icons;
