import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = (event) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  
  const goToNextSlide = (event) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };
  


  const showPrevButton = currentIndex > 0;
  const showNextButton = currentIndex < images.length - 1;

  return (
    <div
      className="relative overflow-hidden mb-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center">
        <Image
          width={1500}
          height={1500}
          style={{ width: '100%', height: "200px" }}
          src={images[currentIndex]['url']}
          alt={`Slide ${currentIndex}`}
        />
      </div>
      {isHovered && (
        <>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full ${
                    index === currentIndex ? 'bg-gray-200 w-3 h-3' : 'bg-gray-300 w-2 h-2'
                  } transition duration-300 transform -translate-y-1/2`} 
                ></button>
              ))}
            </div>
          </div>
          {showPrevButton && (
            <div className="absolute flex items-center top-1/2 transform -translate-y-1/2 left-2">
              <button
                onClick={goToPrevSlide}
                className=" bg-white bg-opacity-50 rounded-full p-3 focus:outline-none focus:ring hover:bg-opacity-75 transition duration-300"
              >
                <FaChevronLeft size={12} />
              </button>
            </div>
          )}
          {showNextButton && (
            <div className="absolute flex items-center top-1/2 transform -translate-y-1/2 right-2">
              <button
                onClick={goToNextSlide}
                className=" bg-white bg-opacity-50 rounded-full p-3 focus:outline-none focus:ring hover:bg-opacity-75 transition duration-300"
              >
                <FaChevronRight size={13} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Carousel;
