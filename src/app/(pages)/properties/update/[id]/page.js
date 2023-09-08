"use client"

import React, { useState } from 'react';
import PropertyForm from '@/components/Form/PropertyForm'
import { useGetPropertiesByIdQuery } from '@/redux/services/propertiesApi';
import ServerErrorComponent from '@/components/ServerError';
import ShimmerUpdate from '@/components/Shimmers/ShimmerUpdate';

const Page = ({params}) => {
    const id = params.id
    const { data, error, isLoading } = useGetPropertiesByIdQuery(String(id));
    const property = {...data};
    property.category = property.type;
    delete property.type;

    if (isLoading){
        return <ShimmerUpdate></ShimmerUpdate>
    }
    if (error){
        return <ServerErrorComponent></ServerErrorComponent>
    }
  return (
    <div className='px-4 md:px-10 '>
      <h1 className="text-center text-2xl md:text-4xl font-semibold mb-4 text-primary">
        Actualizar Propiedades
      </h1>
      <PropertyForm data={...property} action="update"></PropertyForm>
    </div>
  )
}

export default Page;
