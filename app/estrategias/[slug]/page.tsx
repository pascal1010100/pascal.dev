import { notFound } from "next/navigation";
import { estrategias } from "@/data/estrategias";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Share2, Clock, BookOpen, ArrowRight, MessageSquare, Tag, Zap, CheckCircle, Settings, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Mapeo de categorías a colores
const categoryColors: Record<string, string> = {
  'Automatización': 'bg-blue-100 text-blue-800',
  'Productos Digitales': 'bg-purple-100 text-purple-800',
  'Educación': 'bg-green-100 text-green-800',
  'E-commerce': 'bg-yellow-100 text-yellow-800',
  'default': 'bg-gray-100 text-gray-800'
};

// Mapeo de dificultad a colores
const difficultyColors: Record<string, string> = {
  'Principiante': 'bg-green-100 text-green-800',
  'Intermedio': 'bg-yellow-100 text-yellow-800',
  'Avanzado': 'bg-red-100 text-red-800'
};

// Componente para la tabla de contenidos
function TableOfContents({ sections }: { sections: { id: string; title: string }[] }) {
  return (
    <div className="sticky top-24 self-start">
      <Card className="p-6 border-border/50 shadow-sm">
        <h3 className="font-medium text-lg mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          Contenido
        </h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm py-1.5 hover:pl-1.5 transition-all"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </Card>
    </div>
  );
}

// Componente de tarjeta de recurso relacionado
function RelatedResource({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-md transition-shadow border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center text-sm text-primary font-medium">
            Ver recurso <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Componente de autor
function AuthorBio() {
  return (
    <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-xl">
      <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20">
        <Image
          src="/images/team/pascal.jpg"
          alt="Pascal Espíritu"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="font-medium">Pascal Espíritu</h4>
        <p className="text-sm text-muted-foreground mb-2">Fundador & Experto en IA</p>
        <p className="text-sm">
          Apasionado por la tecnología y la enseñanza con más de 10 años de experiencia en desarrollo web y marketing digital.
        </p>
      </div>
    </div>
  );
}

type PageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function StrategyPage({ params }: PageProps) {
  const { slug } = params;
  const estrategia = estrategias.find((item) => item.slug === slug);

  if (!estrategia) return notFound();

  const sections = [
    { id: 'introduccion', title: 'Introducción' },
    { id: 'caracteristicas', title: 'Características Clave' },
    { id: 'herramientas', title: 'Herramientas Recomendadas' },
    { id: 'ingresos', title: 'Potencial de Ingresos' },
    { id: 'implementacion', title: 'Cómo Empezar' },
  ];

  // Generar recursos relacionados basados en la categoría
  const relatedResources = estrategias
    .filter(e => e.slug !== slug && e.category === estrategia.category)
    .slice(0, 2)
    .map(e => ({
      title: e.title,
      description: e.description,
      href: `/estrategias/${e.slug}`
    }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${categoryColors[estrategia.category || 'default']}`}>
                <Tag className="h-4 w-4" />
                {estrategia.category || 'Estrategia Digital'}
              </span>
              {estrategia.difficulty && (
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${difficultyColors[estrategia.difficulty] || difficultyColors['Principiante']}`}>
                  {estrategia.difficulty}
                </span>
              )}
              {estrategia.pricingStrategy && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <DollarSign className="h-4 w-4" />
                  {estrategia.pricingStrategy.model}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {estrategia.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {estrategia.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                {Math.ceil((estrategia.content?.split(' ') || []).length / 200) || 5} min de lectura
              </div>
              <span>•</span>
              <time dateTime={estrategia.date || '2025-07-15'}>
                {format(new Date(estrategia.date || '2025-07-15'), "d 'de' MMMM, yyyy", { locale: es })}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Tabla de contenidos - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <TableOfContents sections={sections} />
          </div>

          {/* Artículo principal */}
          <article className="lg:col-span-6">
            {/* Imagen destacada */}
            <div className="rounded-2xl overflow-hidden mb-10 shadow-xl">
              <Image
                src={estrategia.image}
                alt={estrategia.title}
                width={1200}
                height={630}
                className="w-full h-auto aspect-video object-cover"
                priority
              />
            </div>

            {/* Contenido del artículo */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Introducción */}
              <section id="introduccion" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-border/30">
                  {estrategia.title}
                </h2>
                <p className="text-lg leading-relaxed">
                  {estrategia.description}
                </p>
                {estrategia.content && (
                  <p className="text-lg leading-relaxed mt-4">
                    {estrategia.content}
                  </p>
                )}
              </section>

              {/* Características clave */}
              {estrategia.features && estrategia.features.length > 0 && (
                <section id="caracteristicas" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mt-16 mb-6 pb-2 border-b border-border/30">
                    Características Clave
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    {estrategia.features.map((feature, i) => (
                      <div key={i} className="bg-muted/30 p-5 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <h3 className="font-semibold text-lg">Característica {i + 1}</h3>
                        </div>
                        <p className="text-muted-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Herramientas recomendadas */}
              {estrategia.automationTools && estrategia.automationTools.length > 0 && (
                <section id="herramientas" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mt-16 mb-6 pb-2 border-b border-border/30">
                    Herramientas Recomendadas
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    {estrategia.automationTools.map((tool, i) => (
                      <div key={i} className="bg-muted/30 p-5 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                        <div className="flex items-center mb-2">
                          <Settings className="h-5 w-5 text-blue-500 mr-2" />
                          <h3 className="font-semibold text-lg">{tool}</h3>
                        </div>
                        <p className="text-muted-foreground">
                          {estrategia.tools?.[i]?.description || 'Herramienta esencial para implementar esta estrategia.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Potencial de ingresos */}
              {estrategia.revenuePotential && (
                <section id="ingresos" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mt-16 mb-6 pb-2 border-b border-border/30">
                    Potencial de Ingresos
                  </h2>
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-border/30">
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                      <h3 className="text-xl font-semibold">Rango de Ingresos Estimado</h3>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${estrategia.revenuePotential.min}K - ${estrategia.revenuePotential.max}K
                      <span className="text-lg font-normal text-muted-foreground ml-2">
                        /{estrategia.revenuePotential.period === 'mes' ? 'mes' : 'año'}
                      </span>
                    </div>
                    {estrategia.pricingStrategy && (
                      <p className="text-muted-foreground mb-4">
                        Modelo de negocio: <span className="font-medium text-foreground">{estrategia.pricingStrategy.model}</span> - {estrategia.pricingStrategy.description}
                      </p>
                    )}
                    {estrategia.successStory && (
                      <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border/30">
                        <p className="font-medium mb-1">✧ Caso de Éxito ✧</p>
                        <p className="text-sm">
                          <span className="font-medium">{estrategia.successStory.example}:</span> {estrategia.successStory.result}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Cómo empezar */}
              <section id="implementacion" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mt-16 mb-6 pb-2 border-b border-border/30">
                  Cómo Empezar
                </h2>
                <div className="bg-muted/30 p-6 rounded-2xl border border-border/30">
                  <h3 className="text-xl font-semibold mb-4">Sigue estos pasos para implementar esta estrategia:</h3>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-medium text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                      <div>
                        <h4 className="font-medium">Investiga y elige las herramientas adecuadas</h4>
                        <p className="text-muted-foreground text-sm">Selecciona las herramientas que mejor se adapten a tus necesidades y presupuesto.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-medium text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                      <div>
                        <h4 className="font-medium">Configura tu infraestructura</h4>
                        <p className="text-muted-foreground text-sm">Prepara tu sitio web, cuentas y configuraciones iniciales.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-medium text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                      <div>
                        <h4 className="font-medium">Desarrolla tu estrategia de contenido</h4>
                        <p className="text-muted-foreground text-sm">Crea un calendario editorial y planifica tu contenido.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-medium text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                      <div>
                        <h4 className="font-medium">Automatiza y escala</h4>
                        <p className="text-muted-foreground text-sm">Implementa sistemas de automatización para hacer crecer tu negocio.</p>
                      </div>
                    </li>
                  </ol>
                  <div className="mt-6">
                    <Button className="w-full sm:w-auto">
                      Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </section>

              {/* CTA intermedio */}
              <div className="my-12 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="text-xl font-semibold mb-3">¿Quieres implementar esta estrategia en tu negocio?</h3>
                <p className="text-muted-foreground mb-4">
                  Descarga nuestra guía paso a paso con ejemplos prácticos y plantillas listas para usar.
                </p>
                <Button>
                  Descargar Guía Gratis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Implementación */}
              <section id="implementacion" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mt-16 mb-6 pb-2 border-b border-border/30">
                  Cómo Implementarlo en 5 Pasos
                </h2>
                <ol className="space-y-8">
                  {[
                    {
                      title: '1. Define tu Estrategia de Contenido',
                      content: 'Identifica a tu audiencia objetivo, sus necesidades y los temas que más les interesan. Crea un calendario editorial con frecuencia de publicación realista.'
                    },
                    {
                      title: '2. Elige las Herramientas Adecuadas',
                      content: 'Selecciona plataformas de generación de contenido, programación y análisis que se adapten a tus necesidades y presupuesto.'
                    },
                    {
                      title: '3. Automatiza la Creación de Contenido',
                      content: 'Utiliza IA para generar borradores, optimizar para SEO y crear imágenes o gráficos complementarios.'
                    },
                    {
                      title: '4. Programa y Publica',
                      content: 'Configura un flujo de trabajo automatizado que incluya revisión, edición y publicación programada.'
                    },
                    {
                      title: '5. Mide y Optimiza',
                      content: 'Analiza el rendimiento de tu contenido y ajusta tu estrategia según los resultados obtenidos.'
                    }
                  ].map((step, i) => (
                    <li key={i} className="relative pl-8">
                      <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {i + 1}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.content}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Herramientas recomendadas */}
              <section id="herramientas" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mt-16 mb-6 pb-2 border-b border-border/30">
                  Herramientas Recomendadas
                </h2>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  {[
                    {
                      name: 'ChatGPT',
                      category: 'Generación de Contenido',
                      description: 'Ideal para crear borradores rápidos y generar ideas de contenido.'
                    },
                    {
                      name: 'Notion AI',
                      category: 'Organización',
                      description: 'Perfecto para estructurar tus ideas y planificar contenido.'
                    },
                    {
                      name: 'Zapier',
                      category: 'Automatización',
                      description: 'Conecta diferentes aplicaciones para automatizar flujos de trabajo.'
                    },
                    {
                      name: 'Google Analytics',
                      category: 'Análisis',
                      description: 'Mide el rendimiento de tu contenido y audiencia.'
                    }
                  ].map((tool, i) => (
                    <div key={i} className="border rounded-xl p-5 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {tool.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{tool.name}</h4>
                          <span className="text-xs text-muted-foreground">{tool.category}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Conclusión */}
              <section id="conclusion" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mt-16 mb-6 pb-2 border-b border-border/30">
                  Conclusión
                </h2>
                <p className="text-lg leading-relaxed">
                  La automatización de blogs con IA ya no es una opción, sino una necesidad para mantenerse competitivo en el mundo digital. 
                  Al implementar las estrategias y herramientas mencionadas, podrás escalar tu presencia en línea, ahorrar tiempo valioso y enfocarte en lo que realmente importa: hacer crecer tu negocio.
                </p>
              </section>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 mb-8">
                {['IA', 'Automatización', 'Marketing de Contenidos', 'Monetización', 'Blogging', 'SEO'].map((tag) => (
                  <Badge key={tag} variant="outline" className="px-3 py-1 text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Compartir */}
              <div className="flex items-center gap-4 py-6 border-t border-border/30">
                <span className="text-sm text-muted-foreground">Compartir:</span>
                {['Twitter', 'LinkedIn', 'Facebook', 'Email'].map((social) => (
                  <Button key={social} variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    {social}
                  </Button>
                ))}
              </div>

              {/* Autor */}
              <div className="mt-12 pt-8 border-t border-border/30">
                <AuthorBio />
              </div>

              {/* Comentarios */}
              <div className="mt-16 pt-8 border-t border-border/30">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Comentarios</h3>
                </div>
                <div className="bg-muted/30 rounded-xl p-6 text-center">
                  <p className="text-muted-foreground mb-4">¿Tienes alguna pregunta o comentario sobre esta estrategia?</p>
                  <Button variant="outline">Iniciar discusión</Button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            {/* Información de la estrategia */}
            <Card className="border-border/30">
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Detalles de la Estrategia
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Categoría</p>
                  <p className="font-medium">{estrategia.category}</p>
                </div>
                {estrategia.difficulty && (
                  <div>
                    <p className="text-sm text-muted-foreground">Nivel de Dificultad</p>
                    <p className="font-medium">{estrategia.difficulty}</p>
                  </div>
                )}
                {estrategia.pricingStrategy && (
                  <div>
                    <p className="text-sm text-muted-foreground">Modelo de Negocio</p>
                    <p className="font-medium">{estrategia.pricingStrategy.model}</p>
                    <p className="text-sm text-muted-foreground mt-1">{estrategia.pricingStrategy.description}</p>
                  </div>
                )}
                {estrategia.readTime && (
                  <div>
                    <p className="text-sm text-muted-foreground">Tiempo de Lectura</p>
                    <p className="font-medium">{estrategia.readTime}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabla de contenidos - Mobile */}
            <div className="lg:hidden">
              <TableOfContents sections={sections} />
            </div>

            {/* Recursos relacionados */}
            {relatedResources.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Estrategias Relacionadas
                </h3>
                <div className="space-y-4">
                  {relatedResources.map((resource, i) => (
                    <RelatedResource key={i} {...resource} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">¿Listo para comenzar?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Aprende a implementar esta estrategia paso a paso con nuestra guía detallada.
                </p>
                <Button className="w-full">
                  Obtener Guía Completa <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Boletín informativo */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardHeader>
                <CardTitle className="text-xl">¿Quieres más estrategias como esta?</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Suscríbete a nuestro boletín semanal con las mejores estrategias de marketing digital.
                  <br />
                  <br />
                  <a href="https://pascaldev.com/boletin" className="text-primary underline">Suscribirme</a>
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Tu correo electrónico" />
                  <Button className="w-full">Suscribirme</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Artículos relacionados */}
      <section className="bg-muted/30 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Artículos Relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {estrategias
              .filter((item) => item.slug !== slug)
              .slice(0, 3)
              .map((item) => (
                <Link key={item.slug} href={`/estrategias/${item.slug}`}>
                  <Card className="h-full group hover:shadow-md transition-shadow overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
