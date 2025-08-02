import { blogPosts } from "@/data/blog";
import Image from "next/image";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 sm:px-6 lg:px-8 py-16">
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">Blog de Pascal.dev</h1>
        <p className="text-lg text-muted-foreground">
          Aprende a monetizar con IA, domina la tecnología y crea libertad financiera digital.
        </p>
      </section>

      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-gray-100 dark:bg-gray-800 text-center py-4 rounded-xl text-sm text-muted-foreground">
          Anuncio Superior (728x90)
        </div>
      </div>

      <section className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-card rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {post.description}
              </p>
              <a
                href={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
              >
                Leer más →
              </a>
            </div>
          </article>
        ))}
      </section>

      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-gray-100 dark:bg-gray-800 text-center py-4 rounded-xl text-sm text-muted-foreground">
          Anuncio Inferior (468x60)
        </div>
      </div>
    </main>
  );
}
