"use client"
import React from 'react';
import { useRouter } from 'next/navigation' 
import { useGetPropertiesQuery } from '@/redux/services/propertiesApi';
import ServerErrorComponent from '@/components/ServerError';
import CardView from '@/components/Cards/CardView';
import Button from '@/components/Form/Button';

const Page = () => {
  const router = useRouter()
  const   {data, error , isLoading} = useGetPropertiesQuery();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return <ServerErrorComponent />;
  }
  return (
    <div>
      <Button label='+ Nuevo'onClick={() => router.push('/properties/create')}/>
      <CardView data={data}></CardView>
    </div>
  );
};

export default Page;
