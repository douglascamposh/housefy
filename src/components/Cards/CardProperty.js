import React, { useState } from "react";
import Image from "next/image";
import { MdLocationOn,MdOutlineHouse } from "react-icons/md";
import Button from "../Form/Button";
import { useRouter } from "next/navigation";
import Carousel from "../Carrousel";
const Card = ({ name, images, address, description, id, propertiesAvailable }) => {
  const router = useRouter();

  return (
    <div className="relative rounded-lg shadow-xl overflow-hidden bg-white cursor-pointer">
      <div className="relative h-48 md:h-58 lg:h-62">
        {images && images.length > 0 ? (
          <Carousel images={images}></Carousel>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
        )}
      </div>

      <div className="p-4">
        <h4 className="uppercase text-xl font-semibold text-primary mb-2">
          {name}
        </h4>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{description}</p>

        <div className="flex items-center text-gray-600">
          <MdLocationOn className="text-xl flex-shrink-0" />
          <p className="ml-2 truncate text-sm ">{address}</p>
        </div>
        <div className="flex mt-2">
          <MdOutlineHouse></MdOutlineHouse>
          <p className="text-xs">{propertiesAvailable} disponibles</p>
        </div>
        <div className="mt-6 flex gap-4">
          <Button
            label="Ver más"
            onClick={() => window.open(`/properties/details/${id}`, "_blank")}
          />
          <Button
            label="Editar"
            onClick={() => router.push(`/properties/update/${id}`)}
          />
        </div>

      </div>
    </div>
  );
};

export default Card;