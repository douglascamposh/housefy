import React from "react";
import Button from "@/components/Form/Button";

const Table = ({ data, renderRowActions }) => {
  // Extraer los encabezados del primer objeto en el array de datos
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((header, index) => (
            <th className="py-2 px-4" key={index}>
              {header}
            </th>
          ))}
          {renderRowActions && <th className="py-2 px-4">Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td className="py-2 px-4 border" key={colIndex}>
                {row[header]}
              </td>
            ))}
            {renderRowActions && (
              <td className="py-2 px-4 border">{renderRowActions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
