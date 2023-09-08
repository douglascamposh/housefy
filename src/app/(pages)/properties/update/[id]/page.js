"use client"

import React from 'react';
import { useGetPropertiesByIdQuery } from '@/redux/services/propertiesApi';
import ServerErrorComponent from '@/components/ServerError';
import ShimmerUpdate from '@/components/Shimmers/ShimmerUpdate';
import PropertyCreateUpdate from '@/components/properties/PropertyCreateUpdate';
import {useUpdatePropertiesMutation} from '@/redux/services/propertiesApi';

const Page = ({params}) => {
    const id = params.id
    const { data, error, isLoading } = useGetPropertiesByIdQuery(String(id));

    const [updateProperty, { isLoading: updateLoading }] = useUpdatePropertiesMutation({
      fixedCacheKey: 'shared-update-post',
    });

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
      <PropertyCreateUpdate data={...property} saveProperty={updateProperty} isLoading={updateLoading} />
    </div>
  )
}

export default Page;
