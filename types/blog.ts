export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface Category {
  slug: string;
  name: string;
  count: number;
}

export interface Tag {
  slug: string;
  name: string;
  count: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  category?: string;
  tag?: string;
}
