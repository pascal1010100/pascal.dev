export type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  featured?: boolean;
  icon?: string;
  category?: string;
};
