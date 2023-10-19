import React from "react";
import Link from "next/link";

const HeaderSale = (params ) => {
  return (
    <div className="bg-white text-black fixed w-full left-0 top-0 z-50 p-4 py-5">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <span className="font-extrabold text-3xl sm:text-2xl xl:text-3xl uppercase cursor-pointer">Logo</span>
        </Link>
        <div className="flex space-x-4 text-primary text-sm font-bold">
          <Link href={`/properties/details/${params.id}/subproperties`}>Cancelar</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderSale;
