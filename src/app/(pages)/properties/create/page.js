"use client"

import React from 'react';
import PropertyCreateUpdate from '@/components/properties/PropertyCreateUpdate';
import {propertyScheme} from '@/app/utils/schema/propertySchema';
import {useCreatePropertiesMutation} from '@/redux/services/propertiesApi';

const Page = () => {
  const [createProperty, { isLoading }] = useCreatePropertiesMutation();  

  return (
    <div className={Styles.container}>
      <h1 className={Styles.pageTitle}>
        Registro de Propiedades
      </h1>
      <PropertyCreateUpdate data={...propertyScheme} saveProperty={createProperty} isLoading={isLoading}/>
    </div>
  );
}

const Styles = {
  pageTitle: "text-center text-2xl md:text-4xl font-semibold mb-4 text-primary",
  container: "px-4 md:px-10"
};

export default Page;
