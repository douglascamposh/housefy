"use client"
import React, { useState } from 'react'; 
import { useGetPropertiesByIdQuery } from "@/redux/services/propertiesApi";
import MapComponent from "@/components/Maps/MapComponent";
import Spinner from '@/components/Spinner';
import { MdLocationCity, MdOutlineInfo, MdConstruction, MdOutlineLocationOn, MdStreetview, MdLocationOn } from "react-icons/md";
import { FaHome, FaCheckCircle, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import Carousel from '@/components/Carrousel';
import ServerErrorComponent from '@/components/ServerError';
import ShimmerDetails from '@/components/Shimmers/ShimmerDetails';
import { categories } from '@/app/constants/data';
const Page = ({ params }) => {
    const id = params.id;
    const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

    const { data, error, isLoading } = useGetPropertiesByIdQuery(String(id));
    
    const handleMarkerPositionChange = (clickedLatLng) => {
        setCoordinates({ latitude: clickedLatLng.lat, longitude: clickedLatLng.lng });
    };

    if (isLoading) {
        return <ShimmerDetails></ShimmerDetails>
    }

    if (error) {
        return <ServerErrorComponent />;
    }
    const category = categories.find(cat => cat.id === data.type);
    return (
        <div className='px-4 md:px-10'>
            <h2 className="text-3xl mb-2 text-center md:text-left">{data.name}</h2>
            <div className="flex items-center mb-1 text-sm text-gray-600">
                <MdConstruction size="1em" className="mr-1" />
                <span>
                    {category ? category.name : 'Sin categoria'}
                </span>
                <MdLocationCity size="1em" className="ml-4 mr-1" />
                <span>
                    {data.address.state}, {data.address.country}    
                </span>
            </div>
            
            
            <div className="flex flex-col md:flex-row">

                <div className="md:w-2/3  pt-4 ">
            {data.images.length !== 0 && <Carousel images={data.images} />}

                    <div className="grid grid-cols-4  bg-primary rounded-md">
                        <div className="flex flex-col items-center bg-primary p-4 rounded-lg">
                            <FaCheckCircle className="text-white text-2xl mb-2 md:text-3    xl" />
                            <p className="text-white text-xs md:text-sm text-center">Propiedades Disponibles:</p>
                            <p className="text-white font-semibold md:text-xl lg:text-2xl">{data.propertiesAvailable}</p>
                        </div>
                        
                        <div className="flex flex-col items-center p-4 rounded-lg">
                            <FaBuilding className="text-white text-2xl mb-2 md:text-3   xl" />
                            <p className="text-white text-xs md:text-sm text-center">Total de Propiedades:</p>
                            <p className="text-white font-semibold md:text-xl lg:text-2xl">{data.totalProperties}</p>
                        </div>
                        
                        <div className="flex flex-col items-center p-4 rounded-lg">
                            <FaCalendarAlt className="text-white text-2xl mb-2 md:text-3    xl" />
                            <p className="text-white text-xs md:text-sm text-center">Propiedades Reservadas:</p>
                            <p className="text-white font-semibold md:text-xl lg:text-2xl">0</p>
                        </div>
                        
                        <div className="flex flex-col items-center p-4 rounded-lg">
                            <FaCheckCircle className="text-white text-2xl mb-2 md:text-3    xl" />
                            <p className="text-white text-xs md:text-sm text-center">Propiedades Vendidas:</p>
                            <p className="text-white font-semibold md:text-xl lg:text-2xl">{data.totalProperties - data.propertiesAvailable}</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-md p-6 rounded-lg mt-4">
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MdOutlineInfo className="text-2xl text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-gray-800">Descripción:</h2>
                                    <p className="text-gray-600">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <MdOutlineLocationOn className="text-2xl text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-gray-800">Ubicación:</h2>
                                    <p className="text-gray-600">
                                        {data.address.city}, {data.address.state}, {data.address.country}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="md:w-1/3 p-4 mt-4 md:mt-0">
                    <MapComponent onMarkerPositionChange={handleMarkerPositionChange} lat={data.address.latitude} lng={data.address.longitude} zoom={17} />
                </div>
            </div>
        </div>
    );
}

export default Page;
