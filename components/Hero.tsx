
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1200/400')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
          Unforgettable Experiences & Gifts
        </h1>
        <p className="text-white text-lg md:text-xl mb-6">
          Curated surprises for every occasion.
        </p>
        <button className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-hover transition-colors duration-300">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
