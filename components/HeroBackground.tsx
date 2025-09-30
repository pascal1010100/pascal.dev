'use client';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-600" />
    </div>
  );
};

export default HeroBackground;
