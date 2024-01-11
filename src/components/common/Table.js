import React from "react";

const Table = ({ data, renderRowActions }) => {
  // Extraer los encabezados del primer objeto en el array de datos
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const { containberStyle, containerHeaderStyle, headerStyle, rowStyle } = styles;

  return (
    <table className={`${containberStyle}`}>
      <thead>
        <tr className={`${containerHeaderStyle}`}>
          {headers.map((header, index) => (
            <th className={`${headerStyle}`} key={index}>
              {header}
            </th>
          ))}
          {renderRowActions && <th className={`${headerStyle}`}>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td className={`${rowStyle} ${headerStyle}`} key={colIndex}>
                {row[header]}
              </td>
            ))}
            {renderRowActions && (
              <td className={`${rowStyle} ${headerStyle}`}>{renderRowActions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  containberStyle: `
    min-w-full 
    bg-white 
    border 
    border-gray-200
  `,
  containerHeaderStyle: `
    bg-gray-100
  `,
  headerStyle: `
    py-2 
    px-4
  `,
  rowStyle: `
    border
  `
};

export default Table;
