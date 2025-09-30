'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingresa un correo electrónico válido." }),
  subject: z.string().min(5, { message: "El asunto es demasiado corto." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      // Aquí iría la lógica para enviar el formulario
      console.log('Enviando formulario:', values);
      
      // Simulamos un envío exitoso después de 1.5 segundos
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Correo Electrónico",
      description: "contacto@pascaldev.com",
      href: "mailto:contacto@pascaldev.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Teléfono",
      description: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Ubicación",
      description: "Ciudad, País",
      href: "#"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-border/30">
                <CardHeader>
                  <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                      <p className="text-muted-foreground mb-6">
                        Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
                      </p>
                      <Button onClick={() => setIsSuccess(false)} variant="outline">
                        Enviar otro mensaje
                      </Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre completo</FormLabel>
                                <FormControl>
                                  <Input placeholder="Tu nombre" {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Correo electrónico</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="tu@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Asunto</FormLabel>
                              <FormControl>
                                <Input placeholder="¿Cómo podemos ayudarte?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mensaje</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Escribe tu mensaje aquí..." 
                                  className="min-h-[120px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full mt-2 flex items-center justify-center"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" /> Enviar mensaje
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold tracking-tight">Información de contacto</h2>
              <p className="text-muted-foreground">
                ¿Prefieres contactarnos directamente? Estamos disponibles a través de los siguientes canales.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-start p-4 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0 p-2 rounded-full bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="pt-6">
                <h3 className="text-lg font-medium mb-4">Horario de atención</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sábado</span>
                    <span className="font-medium text-foreground">10:00 AM - 2:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Domingo</span>
                    <span className="font-medium text-foreground">Cerrado</span>
                  </p>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-lg font-medium mb-4">Síguenos</h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'Twitter', icon: '🐦', url: '#' },
                    { name: 'GitHub', icon: '💻', url: '#' },
                    { name: 'LinkedIn', icon: '💼', url: '#' },
                    { name: 'YouTube', icon: '▶️', url: '#' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden h-[400px] bg-muted">
            {/* Aquí iría un mapa interactivo (Google Maps, Mapbox, etc.) */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                <p>Mapa de ubicación</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar tu próximo proyecto?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Estamos aquí para ayudarte a hacerlo realidad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="text-primary">
              Ver servicios
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
              Llamar ahora
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
