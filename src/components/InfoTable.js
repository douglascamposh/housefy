import React from "react";
import RenderInfoTable from "./RenderRowInfoTable";

const InfoTable = ({ tableConfig, data }) => {
  return (
    <div className="flex flex-col items-center justify-center border-primary mt-10">
      <div className="w-full max-w-7xl bg-white rounded-lg overflow: auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              {tableConfig.map((config, index) => (
                <th key={index} className="px-4 py-2 bg-gray-200 text-gray-600 font-semibold">{config.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((obj, indexObj) => (
              <tr key={obj.id} className="group hover:bg-gray-200 ">
                {tableConfig.map((config, index) => (
                  <td key={index} className="border px-4 py-3"><RenderInfoTable config={config} obj={obj} indexObj={indexObj} /></td>
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

