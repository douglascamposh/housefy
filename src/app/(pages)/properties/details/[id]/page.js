"use client"
import React, { useState,useEffect } from 'react'; 
import { useGetPropertiesByIdQuery, useGetSubPropertiesQuery } from "@/redux/services/propertiesApi";
import MapComponent from "@/components/Maps/MapComponent";
import { MdLocationCity, MdOutlineInfo, MdConstruction, MdOutlineLocationOn, MdStreetview, MdLocationOn } from "react-icons/md";
import Carousel from '@/components/Carrousel';
import ServerErrorComponent from '@/components/ServerError';
import ShimmerDetails from '@/components/Shimmers/ShimmerDetails';
import { categories } from '@/app/utils/schema/propertySchema';
import { MdLightbulbOutline,MdCheckCircleOutline,MdOutlineWaterDamage,MdOutlineDomain,MdOutlineKingBed } from "react-icons/md";
import Button from '@/components/Form/Button';
import { FaMap } from 'react-icons/fa';
import Link from 'next/link'
const Page = ({ params }) => {
    const id = params.id;
    const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
    const { data, error, isLoading } = useGetPropertiesByIdQuery(String(id));
    const handleMarkerPositionChange = (clickedLatLng) => {
        setCoordinates({ latitude: clickedLatLng.lat, longitude: clickedLatLng.lng });
    };

    if (isLoading ) {
        return <ShimmerDetails></ShimmerDetails>
    }

    if (error) {
        return <ServerErrorComponent />;
    }
    const category = categories.find(cat => cat.id === data.type);
    return (
        <div className='px-4 md:px-10'>
            <h2 className="text-3xl mb-2 text-center md:text-left uppercase ">{data.name}</h2>
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
            {data.images.length !== 0 && <Carousel images={data.images} h="300px"/>}

            <div className="flex flex-col md:flex-row">
                
                <div className="md:w-2/3  pt-4 ">
                    <div className='flex justify-center md:justify-around mb-8'>
                        <div className="w-[150px] md:w-[250px] bg-white border rounded-lg shadow-lg">
                            <div className="p-2 md:p-8 flex items-center ">

                                <div className="md:flex md:items-center text-center">
                                <div className="md:mr-4 mr-1 flex justify-center ">
                                    <MdOutlineDomain className='md:text-2xl text-xl text-gray-700'/>
                                </div>
                                <div>
                                    <p className="text-black md:text-sm text-xs">{data.subProperties.length} propiedades totales</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[150px] md:w-[250px] bg-white border rounded-lg shadow-lg">
                            <div className="p-2 md:p-8  flex items-center ">
                                <div className="md:flex md:items-center">
                                <div className="md:mr-4 mr-1 flex justify-center ">


                                    <MdOutlineWaterDamage className='md:text-2xl text-xl text-gray-700'/>
                                </div>
                                <div>
                                    <p className="text-black md:text-sm text-xs">Servicio de agua</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[150px] md:w-[250px] bg-white border rounded-lg shadow-lg">
                            <div className="p-2 md:p-8   flex items-center ">

                                <div className="md:flex md:items-center">
                                <div className="md:mr-4 mr-1 flex justify-center ">

                                    <MdLightbulbOutline className='md:text-2xl text-xl text-gray-700'/>
                                </div>
                                <div>
                                    <p className="text-black md:text-sm text-xs">Electricidad.</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <label className='text-xl font-semibold '>Acerca de este lugar</label>
                    <p>{data.description}</p>

                </div>

                <div className="md:w-1/3 p-4 mt-4 md:mt-0">
                    <Link href={`/properties/details/${id}/subproperties`}>
                    <div className="bg-primary hover:bg-orange-300 text-white p-4 rounded-lg cursor-pointer flex items-center justify-center space-x-2">
                        <FaMap className="text-2xl" />
                        <span className="font-semibold">Ver plano</span>
                    </div>

                    </Link>

                    <MapComponent onMarkerPositionChange={handleMarkerPositionChange} lat={data.address.latitude} lng={data.address.longitude} zoom={17} />
                </div>
            </div>
        </div>
    );
}

export default Page;
