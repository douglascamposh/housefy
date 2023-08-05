"use client"

import CardView from '@/components/Cards/CardView'
import React from 'react'

import { useGetPostsQuery } from '@/redux/services/propertiesApi';
import ServerErrorComponent from '@/components/ServerError';

const Page=()=> {
  const datos=useGetPostsQuery();
  console.log(datos);
  if (datos.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (datos.error) {
    return (
      <ServerErrorComponent></ServerErrorComponent>
    );
  }

  return (
    <div>

    


        <CardView data={datos}></CardView>

    </div>
  )
}

export default Page