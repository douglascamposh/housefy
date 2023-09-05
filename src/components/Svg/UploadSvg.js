import React, { useState, useRef, useEffect } from "react";
import { useUploadImagePropertiesMutation } from '@/redux/services/propertiesApi';
import { toast } from 'react-toastify';
import { MdOutlineAddPhotoAlternate, MdClose } from 'react-icons/md';
import Button from '../Form/Button';
import { FormInputLabel } from "../common/FormInputLabel";
import { Logger } from "@/services/Logger";
const TIPOS_DE_IMAGEN_ADMITIDOS = ['image/svg+xml'];
const EXTENSION_IMAGEN_VALIDA = '.svg';

const UploadSvg = ({ SvgUploaded, SvgSave, ModalSvg }) => {
  const [previewImagesSave, setPreviewImagesSave] = useState(SvgSave);
  const [file, setFile] = useState({ content: null });
  const svgContainerRef = useRef(null);
  const [clickedId, setClickedId] = useState(null);
  const [pathStyleClass, setPathStyleClass] = useState("default-path-style");
  const [svgIds,setSvgIds]=useState([])

  const [subProperty, setSubProperty] = useState({
    price: '',
    size: '',
    isAvailable: true,
  });

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
    if (imageData.files.length + previewImagesSave.length > 0) {
      try {
        const promises = imageData.files.map(async (file) => {
          try {
            const response = await uploadImageMutation({ file });
            if (response.data) {
              return {
                id: response.data.imageId,
                url: response.data.url,
              };
            }
            return null;
          } catch (error) {
            return null;
          }
        });

        const uploadResults = await Promise.allSettled(promises);
        const combinedImages = [
          ...previewImagesSave,
          ...uploadResults
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value),
        ];

        setImageData((prevState) => ({
          ...prevState,
          urlImages: [...prevState.urlImages, ...combinedImages],
        }));
        ModalSvg(false)
        toast.success('Svg subidas exitosamente');
        SvgUploaded(combinedImages);
        Logger.error(combinedImages)
      } catch (error) {
        toast.error('Error en la carga de imágenes');
      }
    } else {
      toast.error('Seleccione al menos una imagen');
    }
  };
  
  const handlePathClick = (e) => {
    const target = e.target;
    if (target.tagName === "path" || target.tagName=="polygon" || target.tagName=="circle") {
      const pathElement = target;
      
      const id = pathElement.getAttribute("id");
      // Si se hizo clic en el mismo path nuevamente, quitar el color.
      if (id === clickedId) {

        setClickedId(null);

      } else {
        
        setClickedId(id);
      }
    }
  };
  const handleSubmit =  (values) => {
    console.log(values)
  }
  
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
      let c=0
      let arrayId=[]
      
      svgPaths.forEach((path) => {
          path.classList.remove("selected-path");
          path.removeAttribute("style"); 
          
          if (c==clickedId){
            path.classList.add("selected-path");
            
          }else{
            path.classList.add(pathStyleClass);
          }
          path.setAttribute("id", c);
          c=c+1
          arrayId.push(path.getAttribute("id"))
      });
      svgPolygon.forEach((polygon) => {
          polygon.removeAttribute("style"); 

          polygon.classList.remove("selected-path");
          
          if (c==clickedId){
            polygon.classList.add("selected-path");
            
          }else{
            polygon.classList.add(pathStyleClass);
          }
          polygon.setAttribute("id", c);
          c=c+1
          arrayId.push(polygon.getAttribute("id"))
      });
      svgCircle.forEach((circle) => {
          circle.removeAttribute("style"); 

          circle.classList.remove("selected-path");
            
          if (c==clickedId){
            circle.classList.add("selected-path");
            
          }else{
            circle.classList.add(pathStyleClass);
          }
          circle.setAttribute("id", c);
          c=c+1
          arrayId.push(circle.getAttribute("id"))
      });

      setSvgIds(arrayId)
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
  }, [file.content, pathStyleClass,clickedId]);

  const styles = `
    .default-path-style {
      fill: #ccc;
      stroke: black;
      stroke-width: 2;
      transition: fill 0.3s ease, stroke 0.3s ease;
    }

    .default-path-style:hover {
      fill: white;
      stroke: green;
    }
    .selected-path {
      fill:  #22E61F; 
    }

  `;
  const mostrarBotonSubir = imageData.files.length === 0;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white pl-6 pr-6 flex flex-col rounded-lg shadow-lg w-full md:h-full md:w-3/4 lg:w-1/2">

        <div className="flex flex-col ">

          <div className='flex items-center border-b-[1px] border-gray-600 p-4 mb-4'>
            <button type="button" onClick={()=>{ModalSvg(false)}} className="flex items-center justify-center p-1 rounded-full  hover:bg-gray-200">
              <MdClose className="text-gray-600 w-4 h-4 " />
            </button>
            <div className='flex-1'>
              <p className='text-center'>Selecciona archivos SVG</p>
            </div>
          </div>

          <style>{styles}</style>
          <label>TOTAL DE PROPIEDADES: {svgIds.length}</label>
  
          {!imageData.previewImage ? (
            <label htmlFor="fileInput" className="h-[420px] flex flex-col hover:bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300 bg-white cursor-pointer">
              <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-full">
                <MdOutlineAddPhotoAlternate className="text-gray-400 w-8 h-8" />
              </div>
            </label>
          ) : null}
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
            ) : null}
  
          </div>
  
          <Button
            onClick={handleUpload}
            type="button"
            disabled={isLoading || mostrarBotonSubir}
            label="Subir"
          />
        </div>
      </div>
    </div>
  );
}  
export default UploadSvg;
