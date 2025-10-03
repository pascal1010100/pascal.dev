import { cn } from '@/lib/utils';

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  html?: string;
}

export function Prose({ html, className, ...props }: ProseProps) {
  if (html) {
    return (
      <div
        className={cn(
          'prose prose-invert max-w-none',
          'prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight',
          'prose-h1:text-4xl prose-h1:md:text-5xl',
          'prose-h2:text-3xl prose-h2:md:text-4xl',
          'prose-h3:text-2xl prose-h3:md:text-3xl',
          'prose-p:text-gray-300 prose-p:leading-relaxed',
          'prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors prose-a:underline-offset-4',
          'prose-ul:list-disc prose-ol:list-decimal',
          'prose-li:marker:text-gray-500',
          'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic',
          'prose-code:rounded-md prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',
          'prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl',
          'prose-img:rounded-xl prose-img:border prose-img:border-gray-800',
          'prose-hr:border-gray-800',
          'prose-table:border-gray-800',
          'prose-th:bg-gray-900/50 prose-th:p-3 prose-th:text-left',
          'prose-td:border-t prose-td:border-gray-800 prose-td:p-3',
          className
        )}
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        'prose prose-invert max-w-none',
        'prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight',
        'prose-h1:text-4xl prose-h1:md:text-5xl',
        'prose-h2:text-3xl prose-h2:md:text-4xl',
        'prose-h3:text-2xl prose-h3:md:text-3xl',
        'prose-p:text-gray-300 prose-p:leading-relaxed',
        'prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors prose-a:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}
