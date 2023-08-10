import React, { useState } from "react";
import Image from "next/image";
import { MdLocationOn, MdKeyboardArrowLeft,MdKeyboardArrowRight } from "react-icons/md";
import Button from "../Form/Button";

const Card = ({ name, images, address, description }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative rounded-lg shadow-xl overflow-hidden bg-white cursor-pointer">
      <div className="relative h-48 md:h-58 lg:h-62">
        {images && images.length > 0 ? (
        <Image
          className="object-cover w-full h-full"
          // src={images[currentImageIndex].url}
          alt={images[currentImageIndex].name}
          layout="fill"
        />
        ) : null}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
        <button
          onClick={handlePrevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-2xl z-10 focus:outline-none  rounded-full p-2  hover:bg-gray-100 transition-opacity"
        >
          <MdKeyboardArrowLeft></MdKeyboardArrowLeft>
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-2xl z-10 focus:outline-none"
        >
          <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </button>
      </div>


      <div className="p-4">
        <h4 className="uppercase text-xl font-semibold text-primary mb-2">{name}</h4>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{description}</p>

        <div className="flex items-center text-gray-600">
          <MdLocationOn className="text-xl flex-shrink-0" />
          <p className="ml-2 truncate text-sm ">{address}</p>
        </div>
        <div className="mt-4">

          <Button label="Ver mas">
          </Button>

        </div>
      </div>
    </div>
  );
};

export default Card;



