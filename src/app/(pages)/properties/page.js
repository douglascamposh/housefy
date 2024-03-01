"use client";
import React, { useState } from "react";
import { useGetPropertiesQuery } from "@/redux/services/propertiesApi";
import ServerErrorComponent from "@/components/ServerError";
import CardView from "@/app/(pages)/properties/PropertyList";
import ShimmerCard from "@/components/Shimmers/ShimmerCard";
import Button from "@/components/common/Button";
import NoDataMessage from "@/components/NoDataMsg";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { Logger } from "@/services/Logger";
import HasPermission from "@/components/permissions/HasPermission";
import { methods } from "@/app/constants/constants";

const Page = () => {
  const { data, error, isLoading } = useGetPropertiesQuery();
  const [filterType, setFilterType] = useState(null);

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between m-2">
          <div></div>
          <HasPermission to={methods.create}>
            <Link href="/properties/create">
              <Button>Crear Propiedad</Button>
            </Link>
          </HasPermission>
        </div>
        <ShimmerCard />
      </div>
    );
  }

  if (error) {
    Logger.error("error at get the properties: " + error);
    return <ServerErrorComponent />;
  }

  const filteredData = filterType
    ? data.filter((item) => item.type === filterType)
    : data;

  return (
    <div className="mx-2">
      <div className="flex justify-between m-2">
        <div className="relative">
          <select
            className="block text-sm appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="1">Urbanizaciones</option>
            <option value="2">Departamentos</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FiChevronDown className="h-4 w-4" />
          </div>
        </div>
        <HasPermission to={methods.create}>
          <Link href="/properties/create">
            <Button>Crear Propiedad</Button>
          </Link>
        </HasPermission>
      </div>
      {filteredData.length !== 0 ? (
        <CardView data={filteredData} />
      ) : (
        <NoDataMessage message="No existen propiedades disponibles en este momento."></NoDataMessage>
      )}
    </div>
  );
};

export default Page;
