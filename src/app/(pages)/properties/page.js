"use client"
import React from 'react';
import { useGetPropertiesQuery } from '@/redux/services/propertiesApi';
import ServerErrorComponent from '@/components/ServerError';
import CardView from '@/components/Cards/CardPropertyView';
import ShimmerCard from '@/components/Shimmers/ShimmerCard';
import Button from '@/components/Form/Button';
import Link from 'next/link';

const Page = () => {
  const { data, error, isLoading } = useGetPropertiesQuery();

  if (isLoading) {
    return (
      <div>
        <Link href='/properties/create'>
          <Button label='Nuevo'/>
        </Link>
        <ShimmerCard />
      </div>
    );
  }

  if (error) {
    return <ServerErrorComponent />;
  }

  return (
    <div>
      <Link href='/properties/create'>
        <Button label='Nuevo'/>
      </Link>
      <CardView data={data} />
    </div>
  );
};

export default Page;
