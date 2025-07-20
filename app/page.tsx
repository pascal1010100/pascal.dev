"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedPosts from "@/components/featured-posts";
import NewsletterSignup from "@/components/newsletter-signup";
import AiChatbot from "@/components/ai-chatbot";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />

      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          
          <FeaturedPosts />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      <div className="fixed bottom-4 right-4 z-50">
        <AiChatbot />
      </div>
    </div>
  );
}
