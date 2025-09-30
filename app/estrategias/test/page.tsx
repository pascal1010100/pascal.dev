type PageParams = {
  slug: string;
};

export default async function TestPage({ params }: { params: PageParams }) {
  return (
    <div className="container mx-auto p-4">
      <h1>Página de prueba: {params.slug}</h1>
      <p>Esta es una página de prueba para verificar el enrutamiento.</p>
    </div>
  );
}
