"use client"

import dynamic from "next/dynamic";

// Importa tu BlogClient con SSR desactivado
const BlogClient = dynamic(() => import("../../components/BlogClient"), {
  ssr: false,
});

export default function BlogClientWrapper() {
  return <BlogClient />;
}
