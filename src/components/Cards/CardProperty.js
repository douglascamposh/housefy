import React from "react";
import { MdLocationOn, MdOutlineHouse ,MdOutlineModeEditOutline,MdDeleteOutline} from "react-icons/md";
import { useRouter } from "next/navigation";
import Carousel from "../Carrousel";

const Card = ({ name, images, address, description, id, propertiesAvailable }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/properties/details/${id}`);
  };
  const handleEditClick = (event) => {
    event.stopPropagation(); 
    router.push(`/properties/update/${id}`);
  };

  return (
    <div className="relative ml-1 rounded-lg shadow-xl overflow-hidden bg-white cursor-pointer" onClick={handleCardClick}>

      <div className="relative h-48 md:h-58 lg:h-62">
        {images && images.length > 0 ? (
          <Carousel images={images} ></Carousel>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
        )}
      </div>
      <div className="flex absolute top-4 right-4">
          <button
            onClick={handleEditClick}
            className="flex items-center mr-1 justify-center w-8 h-8 rounded-full bg-white hover:bg-gray-300 shadow-md"
          >
            <MdOutlineModeEditOutline className="text-gray-600 text-lg" />
          </button>
          <button
            onClick={handleEditClick}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-gray-300 shadow-md"
          >
            <MdDeleteOutline className="text-gray-600 text-lg" />
          </button>
      </div>


      <div className="p-4">
        <h4 className="uppercase line-clamp-2 h-[50px] text-xl font-semibold text-primary mb-2">
          {name}
        </h4>
        <p className="text-sm text-gray-500 h-[40px] line-clamp-2 mb-4">{description}</p>

        <div className="flex items-center text-gray-600">
          <MdLocationOn className="text-xl flex-shrink-0" />
          <p className="ml-2 truncate text-sm ">{address}</p>
        </div>
        <div className="flex mt-2">
          <MdOutlineHouse></MdOutlineHouse>
          <p className="text-xs">{propertiesAvailable} disponibles</p>
        </div>

      </div>
    </div>
  );
};

export default Card;
