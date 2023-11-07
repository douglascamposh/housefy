"use client";
import React, { useState } from "react";
import { useGetPropertiesByIdQuery } from "@/redux/services/propertiesApi";
import MapComponent from "@/components/Maps/MapComponent";
import { MdLocationCity, MdConstruction } from "react-icons/md";
import Carousel from "@/components/Carrousel";
import ServerErrorComponent from "@/components/ServerError";
import ShimmerDetails from "@/components/Shimmers/ShimmerDetails";
import { categories } from "@/app/utils/schema/propertySchema";
import { FaMap } from "react-icons/fa";
import Link from "next/link";
import { serviceOptions } from "@/app/constants/constants";
const Page = ({ params }) => {
  const id = params.id;
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const { data, error, isLoading } = useGetPropertiesByIdQuery(String(id));
  const handleMarkerPositionChange = (clickedLatLng) => {
    setCoordinates({
      latitude: clickedLatLng.lat,
      longitude: clickedLatLng.lng,
    });
  };

  if (isLoading) {
    return <ShimmerDetails></ShimmerDetails>;
  }

  if (error) {
    return <ServerErrorComponent />;
  }
  const category = categories.find((cat) => cat.id === data.type);
  return (
    <div className="px-4 md:px-10">
      <h2 className="text-3xl mb-2 text-center md:text-left uppercase ">
        {data.name}
      </h2>
      <div className="flex items-center mb-1 text-sm text-gray-600">
        <MdConstruction size="1em" className="mr-1" />
        <span>{category ? category.name : "Sin categoria"}</span>
        <MdLocationCity size="1em" className="ml-4 mr-1" />
        <span>
          {data.address.state}, {data.address.country}
        </span>
      </div>
      {data.images.length !== 0 && <Carousel images={data.images} h="300px" />}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3  pt-2 ">
          <label className="text-xl font-semibold ">Acerca de este lugar</label>
          <p>{data.description}</p>
          <br></br>
          <hr></hr>
          <br></br>
          <label className="text-xl font-semibold">
            Lo que este lugar ofrece
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1 sm:mt-8">
            {data && data.services.length != 0 ? (
              data.services.map((servicio, index) => (
                <div key={index} className=" flex items-center">
                  <div>{serviceOptions[servicio]}</div>
                  <div className="ml-5">{servicio}</div>
                </div>
              ))
            ) : (
              <div>Esta propiedad no tiene servicios.</div>
            )}
          </div>
        </div>

        <div className="md:w-1/3 p-4 mt-4 md:mt-0">
          <Link href={`/properties/details/${id}/subproperties`}>
            <div className="bg-primary hover:bg-orange-300 text-white p-4 rounded-lg cursor-pointer flex items-center justify-center space-x-2">
              <FaMap className="text-2xl" />
              <span className="font-semibold">Ver plano</span>
            </div>
          </Link>

          <MapComponent
            onMarkerPositionChange={handleMarkerPositionChange}
            lat={data.address.latitude}
            lng={data.address.longitude}
            zoom={17}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
