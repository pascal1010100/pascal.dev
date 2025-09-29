'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const OceanBackground = dynamic(
  () => import('./OceanBackground'),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-600" />
  }
);

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-600" />}>
        <OceanBackground />
      </Suspense>
    </div>
  );
};

export default HeroBackground;
