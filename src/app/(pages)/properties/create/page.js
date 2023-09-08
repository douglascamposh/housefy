"use client"

import React from 'react';
import PropertyForm from '@/components/Form/PropertyForm';
import {propertyScheme} from '@/app/utils/schema/propertySchema';

const Page = () => {

  return (
    <div className={Styles.container}>
      <h1 className={Styles.pageTitle}>
        Registro de Propiedades
      </h1>
      <PropertyForm data={...propertyScheme} action="register"></PropertyForm>
    </div>
  );
}

const Styles = {
  pageTitle: "text-center text-2xl md:text-4xl font-semibold mb-4 text-primary",
  container: "px-4 md:px-10"
};

export default Page;
