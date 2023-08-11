"use client"

import React, { useState } from 'react';
import CreateForm from '@/components/Form/CreatePropertyFrom';

const Page = () => {

  return (
    <div className='px-4 md:px-10'>
      <h1 className="text-center text-2xl md:text-4xl font-semibold mb-4 text-primary">
        Registro de Propiedades
      </h1>
      <CreateForm></CreateForm>
    </div>
  )
}

export default Page;
