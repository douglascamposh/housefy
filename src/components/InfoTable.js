import React from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { flexRender } from '@tanstack/react-table'; 

const InfoTable = ({ data, columns }) => {

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col max-w-7x1 items-center justify-center mt-10">
        <table className="min-w-full  bg-white border border-gray-300">
          <thead className="leading-normal">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-primary text-white text-xl">
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan} className="px-4 py-3 border-b-2 border-gray-200 text-left text-lg font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody className="text-gray-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className=" group hover:bg-orange-200 transition-colors duration-200">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border border-gray-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  )
};

export default InfoTable;
