import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function StrategyCTA() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative px-4 sm:px-6">
        <div className="relative z-10 text-center py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center justify-center mb-6"
          >
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              <Zap className="h-4 w-4 mr-2" />
              ¿Listo para comenzar?
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
          >
            ¿Necesitas ayuda para implementar estas estrategias?
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            Nuestro equipo de expertos puede ayudarte a implementar estas estrategias en tu negocio.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
          >
            <Button size="lg" className="px-8 py-6 text-base" asChild>
              <Link href="/contacto">
                Hablar con un experto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-base" asChild>
              <Link href="/blog">
                Ver más recursos
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
