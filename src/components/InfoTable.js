import React from "react";
import { useMemo, useTable } from 'react-table';
const InfoTable = ({ data, columns }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow overflow-hidden">
        <table {...getTableProps()} className="min-w-full leading-normal">
          <thead >
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className='bg-primary text-white' >
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="px-4 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold text-white uppercase tracking-wider">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="text-gray-700">
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()} className="group hover:bg-orange-200 transition-colors duration-250">
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className="px-4 py-3 border-b">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default InfoTable;

