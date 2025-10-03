import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-4xl font-display font-bold">Página no encontrada</h2>
        
        <p className="text-xl text-muted-foreground">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
          Puede que la dirección sea incorrecta o la página se haya movido.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button asChild size="lg">
            <Link href="/">
              Volver al inicio
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">
              Ver el blog
            </Link>
          </Button>
        </div>
        
        <div className="pt-12">
          <p className="text-muted-foreground text-sm">
            Si crees que esto es un error, por favor{' '}
            <a 
              href="mailto:soporte@pascal.dev" 
              className="text-primary hover:underline"
            >
              contáctanos
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
