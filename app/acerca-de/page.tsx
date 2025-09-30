import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Rocket, Lightbulb, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Acerca de Nosotros - Pascal Dev",
  description: "Conoce más sobre nuestra misión, visión y el equipo detrás de Pascal Dev.",
};

const team = [
  {
    name: "Pascal",
    role: "Fundador & Desarrollador Senior",
    image: "/images/team/pascal.jpg",
    bio: "Apasionado por la tecnología y la enseñanza con más de 10 años de experiencia en desarrollo web.",
  },
  // Agrega más miembros del equipo según sea necesario
];

const stats = [
  { value: "1000+", label: "Usuarios activos" },
  { value: "50+", label: "Estrategias publicadas" },
  { value: "10+", label: "Años de experiencia" },
  { value: "24/7", label: "Soporte activo" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Transformando ideas en realidades digitales
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              En Pascal Dev, nos apasiona crear soluciones tecnológicas innovadoras que impulsen el éxito de nuestros usuarios.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/estrategias">
                  Ver estrategias <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Contactar equipo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Pascal Dev nació de la pasión por compartir conocimiento y herramientas que realmente marquen la diferencia en el mundo digital.
                </p>
                <p>
                  Comenzamos como un pequeño blog técnico y hoy nos hemos convertido en una plataforma de referencia para desarrolladores y emprendedores digitales.
                </p>
                <p>
                  Nuestro objetivo es claro: democratizar el acceso a herramientas y estrategias tecnológicas de alto nivel.
                </p>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/about/office.jpg"
                alt="Nuestro espacio de trabajo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Innovación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Buscamos constantemente nuevas formas de resolver problemas y mejorar nuestras soluciones.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Comunidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Creemos en el poder de la colaboración y el crecimiento conjunto.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Excelencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Nos esforzamos por ofrecer la mejor calidad en cada aspecto de nuestro trabajo.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Conoce al Equipo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Únete a nuestra comunidad y lleva tus habilidades al siguiente nivel.
          </p>
          <Button size="lg" variant="secondary" className="text-primary">
            Empezar ahora
          </Button>
        </div>
      </section>
    </div>
  );
}
