"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaFileCirclePlus } from "react-icons/fa6";
import { BsFiletypeCsv } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import "tailwindcss/tailwind.css";
import Checkbox from "../common/CheckBox";
import Button from "../Form/Button";
import Spinner from "../Spinner";
import { useUploadCsvSalemanMutation } from "@/redux/services/propertiesApi";
import { Logger } from "@/services/Logger";
import { DragAndDropComponent } from "./DragAndDropComponent";
import { headersMappingSaleman } from "@/app/constants/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CsvImportSalesman = ({ closeModal }) => {
  const [uploadCsvSalesman, { isLoading, isError, isSuccess, error }] =
    useUploadCsvSalemanMutation();
  const [csvData, setCsvData] = useState(null);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [importedData, setImportedData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedHeaders, setSelectedHeaders] = useState([null]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [steps, setSteps] = useState(0);

  const handleSelectedHeaders = (values) => setSelectedHeaders(values);
  const handleCheckboxChange = () => setIsChecked(!isChecked);

  const removeAccents = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      setSelectedFile(file ? file.name : null);

      if (file) {
        const parsedData = await parseCsvFile(file);
        setCsvData(parsedData);
      }
    } catch (error) {
      console.error("Error loading CSV file: ", error);
    }
  };

  const parseCsvFile = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: false,
        encoding: "UTF-8",
        complete: (result) => {
          const dataWithoutAccents = result.data.map((row) => {
            const newRow = {};
            for (const key in row) {
              newRow[key] = removeAccents(row[key]);
            }
            return newRow;
          });
          resolve(dataWithoutAccents);
        },
        error: reject,
      });
    });
  };

  const selectHeaders = (data, selectedHeaders) => {
    return data
      .map((obj) => {
        if (selectedHeaders.every((key) => key in obj)) {
          return selectedHeaders.reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
          }, {});
        } else {
          return null;
        }
      })
      .filter((obj) => obj !== null);
  };

  const mapHeaders = (array, selectedHeaders, headersMappingSaleman) => {
    return array.map((item) => {
      const newObj = {};
      selectedHeaders.forEach((key, index) => {
        newObj[headersMappingSaleman[index].key] = item[key];
      });
      return newObj;
    });
  };

  const reviewData = () => {
    setSteps(steps + 1);
    const filteredArray = selectHeaders(csvData, selectedHeaders);
    const updatedPeople = mapHeaders(
      filteredArray,
      selectedHeaders,
      headersMappingSaleman
    );
    setImportedData(updatedPeople);
  };

  const handleRemoveFile = () => setSelectedFile(null);

  const handleUpload = (file) => {
    if (file) {
      uploadCsvSalesman({ file, filename: selectedFile })
        .unwrap()
        .then((response) => {
          Logger.info("File imported successfully: ", response);
        })
        .catch((error) => {
          Logger.error("Error uploading the file: ", error);
        });
    } else {
      toast.error("Seleccione un archivo antes de cargarlo.");
    }
  };

  const handleImportCsv = () => {
    setSteps(steps + 1);
    const csv = Papa.unparse(importedData);
    const csvBlob = new Blob([csv], { type: "text/csv" });
    handleUpload(csvBlob);
  };

  const assignHeaders = () => {
    setSteps(steps + 1);
    if (!isChecked) {
      const reorganizedPeople = csvData.map((person, index) => {
        const keys = Object.keys(person);
        const newPerson = {};
        keys.forEach((key, innerIndex) => {
          newPerson[innerIndex + 1] = person[key];
        });
        return newPerson;
      });
      setCsvData(reorganizedPeople);
      const keys = Object.keys(reorganizedPeople[0]);
      setCsvHeaders(keys);
    } else {
      const keys = Object.values(csvData[0]);

      const newArray = csvData.slice(1).map((item) => {
        const newObj = {};
        keys.forEach((key, index) => {
          newObj[key] = item[index];
        });
        return newObj;
      });

      // Final result
      setCsvData(newArray);
      setCsvHeaders(Object.keys(newArray[0]));
    }
  };

  return (
    <div className="w-full h-full overflow-auto">
      {steps === 0 && (
        <>
          <label
            htmlFor="file-upload"
            className="cursor-pointer mb-3 border-dashed border-[4px] border-gray-300 flex flex-col justify-center items-center p-8 rounded-lg h-[50vh] text-center"
          >
            {!selectedFile ? (
              <>
                <FaFileCirclePlus className="text-green-400 text-[70px]" />
                <p className="mb-3 mt-3 text-lg font-bold ">
                  Seleccione un archivo csv para importar
                </p>
                <p className="text-xs text-gray-400">
                  O arrástrelo y suéltelo aquí
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </>
            ) : (
              <>
                <p className="mb-3 text-gray-600 text-xs ">
                  Archivo seleccionado:
                </p>
                <BsFiletypeCsv className="text-green-400 text-[50px]"></BsFiletypeCsv>
                <p className="mb-3 flex text-lg items-center justify-center">
                  {selectedFile}
                </p>
                <Checkbox
                  label="El archivo CSV tiene encabezados"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </>
            )}
          </label>
          {selectedFile && (
            <div className="flex justify-between items-center w-full ">
              <div className="flex">
                <button
                  onClick={handleRemoveFile}
                  className="border-red-600 border-2 hover:bg-red-700 text-red-600 hover:text-white py-2 px-4 rounded cursor-pointer"
                >
                  Eliminar archivo
                </button>
              </div>
              <div>
                <Button onClick={assignHeaders}>Siguiente</Button>
              </div>
            </div>
          )}
        </>
      )}

      {steps === 1 && (
        <>
          <div className="h-[50vh] flex justify-center">
            {csvData && (
              <DndProvider backend={HTML5Backend}>
                <DragAndDropComponent
                  headers={csvHeaders}
                  handleSelectedHeaders={handleSelectedHeaders}
                  headersMapping={headersMappingSaleman}
                />
              </DndProvider>
            )}
          </div>
          <div className="flex justify-between">
            <div></div>
            {!selectedHeaders.some((element) => element === null) && (
              <Button onClick={reviewData}>Continuar</Button>
            )}
          </div>
        </>
      )}

      {steps === 2 && (
        <>
          {importedData && (
            <div className="overflow-auto h-[50vh]">
              <h4 className="text-center font-bold mb-4">Vista previa</h4>

              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 ">
                    {headersMappingSaleman.map((header, index) => (
                      <th className="py-2 px-4 " key={index}>
                        {header.text}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {importedData.map((data, index) => (
                    <tr key={index}>
                      {Object.keys(data).map((key, index) => (
                        <td className="py-2 px-4 border-b" key={index}>
                          {data[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-between mt-4">
            <Button onClick={() => setSteps(steps - 1)}>Anterior</Button>
            <Button onClick={handleImportCsv}>Importar</Button>
          </div>
        </>
      )}

      {steps === 3 && (
        <>
          {isLoading && <Spinner></Spinner>}
          {isSuccess && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-5 border-[2px] rounded-full w-[100px] h-[100px] p-2 flex justify-center items-center border-green-300">
                <MdDone className="text-[70px] text-green-500"></MdDone>
              </div>

              <p className="font-bold text-lg">
                Archivo importado exitosamente
              </p>
              <Button onClick={() => closeModal()}>Aceptar</Button>
            </div>
          )}
          {isError && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-5 border-[2px] rounded-full w-[100px] h-[100px] p-2 flex justify-center items-center border-red-300">
                <MdDone className="text-[70px] text-red-500"></MdDone>
              </div>

              <p className="font-bold text-lg">
                Hubo un error al importar el archivo.
              </p>
              <Button onClick={() => closeModal()}>Cerrar</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CsvImportSalesman;
