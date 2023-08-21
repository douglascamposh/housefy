import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <Image
          width={200}
          height={160}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ height: '100%', width: '100%' }}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="rounded-lg shadow-lg max-h-96 w-auto"
        />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
        <button
          onClick={goToPrevSlide}
          className="text-white bg-transparent px-4 py-4 rounded-full focus:outline-none focus:ring hover:bg-black hover:bg-opacity-50 transition duration-300"
        >
          <FaChevronLeft size={18} />
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
        <button
          onClick={goToNextSlide}
          className="text-white bg-transparent px-4 py-4 rounded-full focus:outline-none focus:ring hover:bg-black hover:bg-opacity-50 transition duration-300"
        >
          <FaChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
