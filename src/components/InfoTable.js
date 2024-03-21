import React from "react";

const InfoTable = ({ headers, data, renderHeader, renderItem }) => {
  return (
    <div className="flex flex-col items-center justify-center border-primary mt-10">
      <div className="w-full max-w-7xl bg-white rounded-lg overflow: auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-primary text-white">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2 font-semibold">{renderHeader(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((obj, indexObj) => (
              <tr key={obj.id} className="group hover:bg-orange-200  transition-colors duration-300">
                {headers.map((header, index) => (
                  <td key={index} className="border px-4 py-3">{renderItem(obj, header, indexObj)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>
  );
};

export default InfoTable;

