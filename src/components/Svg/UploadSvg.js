import React, { useState, useRef, useEffect } from "react";

import { useUploadImagePropertiesMutation } from '@/redux/services/propertiesApi';
import { toast } from 'react-toastify';
import { MdOutlineAddPhotoAlternate, MdClose } from 'react-icons/md';
import Button from '../Form/Button';
import { Logger } from "@/services/Logger";
const TIPOS_DE_IMAGEN_ADMITIDOS = ['image/svg+xml'];
const EXTENSION_IMAGEN_VALIDA = '.svg';

const UploadSvg = ({ SvgUploaded, SvgSave, ModalSvg }) => {

  const [file, setFile] = useState({ content: null });
  const svgContainerRef = useRef(null);
  const [clickedId, setClickedId] = useState(null);
  const [pathStyleClass, setPathStyleClass] = useState("default-path-style");

  
  const [imageData, setImageData] = useState({
    files: [],
    previewImage: null,
    urlImages: [],
  });
  const [uploadImageMutation, { isLoading }] = useUploadImagePropertiesMutation();

  const validarImagen = (archivo) => {
    return (
      TIPOS_DE_IMAGEN_ADMITIDOS.includes(archivo.type) && archivo.name.endsWith(EXTENSION_IMAGEN_VALIDA)
    );
  };

  const handleFileChange = (e) => {
    const archivoSeleccionado = e.target.files[0];

    if (validarImagen(archivoSeleccionado)) {
      setImageData({
        files: [archivoSeleccionado],
        previewImage: URL.createObjectURL(archivoSeleccionado),
        urlImages: [],
      });
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            setFile({ content: event.target.result });
          }
        };
        reader.readAsText(file);
      }

    } else {
      toast.error('Por favor selecciona un archivo SVG válido');
    }
  };

  const handleRemoveImage = () => {
    setImageData({
      files: [],
      previewImage: null,
      urlImages: [],
    });
  };

  const handleUpload = async () => {
    if (imageData.files.length > 0) {
      try {
        const archivo = imageData.files[0];
        Logger.warn("Informacion",archivo)

      } catch (error) {
        toast.error('Error en la carga de la imagen');
      }
    } else {
      toast.error('Seleccione una imagen');
    }
  };

  
  const handlePathClick = (e) => {
    const target = e.target;
    if (target.tagName === "path") {
      const pathElement = target;
      pathElement.setAttribute("fill", "yellow");
      const id = pathElement.getAttribute("id");
      setClickedId(id);
    }
  };
  
  const applyStylesToPaths = () => {
    if (file.content && svgContainerRef.current) {
      const container = document.createElement("div");
      container.innerHTML = file.content;
      const svgSelect = container.querySelector("svg");


      const svgPolygon = container.querySelectorAll("polygon");
      const svgPaths = container.querySelectorAll("path");
      const svgCircle = container.querySelectorAll("circle");

      svgSelect.style.width = "100%"; 
      svgSelect.style.height = "100%"; 


      svgPaths.forEach((path) => {
        path.classList.add(pathStyleClass);
      });
      svgPolygon.forEach((polygon) => {
        polygon.classList.add(pathStyleClass);
      });
      svgCircle.forEach((circle) => {
        circle.classList.add(pathStyleClass);
      });

      const modifiedSvgContent = container.innerHTML;
      setFile({ content: modifiedSvgContent });
    }
  };

  useEffect(() => {
    applyStylesToPaths();
    if (file.content && svgContainerRef.current) {
      svgContainerRef.current.addEventListener("click", handlePathClick);
    }
    return () => {
      if (svgContainerRef.current) {
        svgContainerRef.current.removeEventListener("click", handlePathClick);
      }
    };
  }, [file.content, pathStyleClass]);

  const styles = `
    .default-path-style {
      fill: green;
      stroke: black;
      stroke-width: 2;
      transition: fill 0.3s ease, stroke 0.3s ease;
    }

    .default-path-style:hover {
      fill: white;
      stroke: green;
    }

  `;
  const mostrarBotonSubir = imageData.files.length === 0;

  return (
    <div className='fixed inset-0 z-50 flex p-5 items-center justify-center bg-gray-700 bg-opacity-50'>
      <div className="bg-white pl-6 pr-6 flex flex-col rounded-lg shadow-lg w-full md:h-full md:w-3/4 lg:w-1/2">
        <div className='flex items-center border-b-[1px] border-gray-600 p-4 mb-4'>
          <button type="button" onClick={()=>{ModalSvg(false)}} className="flex items-center justify-center p-1 rounded-full  hover:bg-gray-200">
            <MdClose className="text-gray-600 w-4 h-4 " />
          </button>
          <div className='flex-1'>
            <p className='text-center'>Selecciona SVG</p>
          </div>
        </div>
        <style>{styles}</style>
      <label htmlFor="">ID: {clickedId}</label>
    
        {!imageData.previewImage ?
          <label htmlFor="fileInput" className="h-full flex flex-col hover:bg-gray-100 items-center justify-center  border-2 border-dashed border-gray-300 bg-white cursor-pointer">
            <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-full">
              <MdOutlineAddPhotoAlternate className="text-gray-400 w-8 h-8" />
            </div>
          </label>
          : null
        }

        {imageData.previewImage && (
      <div ref={svgContainerRef} className="svg-container">
      {file.content && (
        <div
          dangerouslySetInnerHTML={{ __html: file.content }}
          className={`svg-content ${pathStyleClass}`}
          style={{ width: "100%", height: "420px" }}
        />
      )}
    </div>
        )}
        <input
          id="fileInput"
          type="file"
          accept=".svg"
          onChange={handleFileChange}
          disabled={isLoading || !mostrarBotonSubir}
          className="sr-only"
        />
        <div className="flex items-center justify-between m-4">
          {imageData.files.length > 0 ? (
            <button
              onClick={handleRemoveImage}
              className="text-red-500 text-xs cursor-pointer"
            >
              Eliminar imagen
            </button>
          ) : (
            <div />
          )}
          <Button
            onClick={handleUpload}
            type="button"
            disabled={isLoading || mostrarBotonSubir}
            label="Subir imagenes"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadSvg;
