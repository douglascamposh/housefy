"use client"

import React from 'react'
import { useGetPostsQuery } from '@/redux/services/propertiesApi';
import ServerErrorComponent from '@/components/ServerError';
import CardView from '@/components/Cards/CardView'

const Page=()=> {
  const data=useGetPostsQuery();
  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  if (data.error) {
    return (
      <ServerErrorComponent></ServerErrorComponent>
    );
  }
  return (
    <div>
        <CardView data={data}></CardView>
    </div>
  )
}

export default Page