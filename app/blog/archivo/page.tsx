import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

interface ArchiveEntry {
  year: number;
  months: {
    month: number;
    monthName: string;
    posts: typeof blogPosts;
  }[];
}

export const metadata: Metadata = {
  title: 'Archivo del Blog | Pascal Dev',
  description: 'Archivo histórico de todas las publicaciones del blog de Pascal Dev organizadas por año y mes.',
};

export default function ArchivePage() {
  // Group posts by year and month
  const archiveData = blogPosts.reduce<ArchiveEntry[]>((acc, post) => {
    const postDate = new Date(post.date);
    const year = postDate.getFullYear();
    const month = postDate.getMonth();
    
    // Find or create year entry
    let yearEntry = acc.find(entry => entry.year === year);
    if (!yearEntry) {
      yearEntry = { year, months: [] };
      acc.push(yearEntry);
    }
    
    // Find or create month entry
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    let monthEntry = yearEntry.months.find(m => m.month === month);
    if (!monthEntry) {
      monthEntry = {
        month,
        monthName: monthNames[month],
        posts: [],
      };
      yearEntry.months.push(monthEntry);
    }
    
    monthEntry.posts.push(post);
    return acc;
  }, [] as ArchiveEntry[]);
  
  // Sort years in descending order
  archiveData.sort((a, b) => b.year - a.year);
  
  // Sort months in descending order within each year
  archiveData.forEach(yearEntry => {
    yearEntry.months.sort((a, b) => b.month - a.month);
  });

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Archivo del Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Explora nuestras publicaciones por año y mes
        </p>
      </header>

      <div className="max-w-3xl mx-auto space-y-12">
        {archiveData.map((yearEntry) => (
          <section key={yearEntry.year} className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">{yearEntry.year}</h2>
            
            <div className="space-y-8">
              {yearEntry.months.map((monthEntry) => (
                <div key={`${yearEntry.year}-${monthEntry.month}`} className="ml-4">
                  <h3 className="text-2xl font-semibold mb-3">
                    {monthEntry.monthName} {yearEntry.year}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({monthEntry.posts.length} artículos)
                    </span>
                  </h3>
                  
                  <ul className="space-y-2">
                    {monthEntry.posts.map((post) => (
                      <li key={post.slug} className="ml-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-lg hover:text-primary transition-colors flex items-start group"
                        >
                          <span className="text-muted-foreground text-sm w-16 flex-shrink-0">
                            {new Date(post.date).getDate()}
                          </span>
                          <span className="group-hover:underline">
                            {post.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
