import React, { useState, useRef, useEffect } from "react";
import { useUploadImagePropertiesMutation } from "@/redux/services/propertiesApi";
import { MdOutlineAddPhotoAlternate, MdClose } from "react-icons/md";
import Button from "../Form/Button";
import { v4 as uuidv4 } from "uuid";
import { stylesSvg } from "@/app/constants/stylesSvg";
import { Logger } from "@/services/Logger";
const TIPOS_DE_IMAGEN_ADMITIDOS = ["image/svg+xml"];
const EXTENSION_IMAGEN_VALIDA = ".svg";

const UploadSvg = ({ SvgUploaded, SvgSave, ModalSvg }) => {
  const [previewSvgsSave, setPreviewSvgsSave] = useState(
    SvgSave && SvgSave.length > 0 ? SvgSave : []
  );
  const [file, setFile] = useState({ content: null });
  const [modifiedFile, setModifiedFile] = useState({ content: null });

  const svgContainerRef = useRef(null);
  const [clickedId, setClickedId] = useState(null);
  const [pathStyleClass, setPathStyleClass] = useState("default-path-style");
  const [svgIds, setSvgIds] = useState([]);

  const [imageData, setImageData] = useState({
    files: [],
    previewImage: null,
    urlImages: [],
  });
  const [
    uploadImageMutation,
    { data: imageUpload, isLoading, error: errorImgUpload },
  ] = useUploadImagePropertiesMutation();

  useEffect(() => {
    if (imageUpload) {
      const uploadedImage = {
        id: imageUpload.imageId,
        url: imageUpload.url,
        weight: 0,
      };
      setImageData((prevState) => ({
        ...prevState,
        urlImages: [...prevState.urlImages, uploadedImage],
      }));
      ModalSvg();
      SvgUploaded([uploadedImage]);
    }
  }, [imageUpload]);

  useEffect(() => {
    if (errorImgUpload) {
      toast.error("Error al carga de la imagen");
      Logger.error("Error at upload the image: ", errorImgUpload);
    }
  }, [errorImgUpload]);

  const validarImagen = (archivo) => {
    return (
      TIPOS_DE_IMAGEN_ADMITIDOS.includes(archivo.type) &&
      archivo.name.endsWith(EXTENSION_IMAGEN_VALIDA)
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
            const svgContent = event.target.result;
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgContent, "image/svg+xml");
            const svgElement = doc.documentElement;

            const pathElements = svgElement.querySelectorAll("path");
            const polygonElements = svgElement.querySelectorAll("polygon");
            const circleElements = svgElement.querySelectorAll("circle");

            const arrayId = [];

            const setIdForElements = (elements) => {
              elements.forEach((pathElement) => {
                let idgen = uuidv4();
                pathElement.setAttribute("id", idgen);
                arrayId.push(idgen);
              });
            };

            setIdForElements(pathElements);
            setIdForElements(polygonElements);
            setIdForElements(circleElements);

            setSvgIds(arrayId);
            const modifiedSvgContent = new XMLSerializer().serializeToString(
              svgElement
            );
            setFile({ content: modifiedSvgContent });
          }
        };
        reader.readAsText(file);
      }
    } else {
      toast.error("Por favor selecciona un archivo SVG válido");
    }
  };

  const handleRemoveImage = () => {
    setFile({ content: null });
    setImageData({
      files: [],
      previewImage: [],
      urlImages: [],
    });
    setPreviewSvgsSave([]);
  };

  const handleUpload = async () => {
    if (modifiedFile.content != null || modifiedFile.name) {
      uploadImageMutation({ file: modifiedFile });
    } else {
      toast.error("Seleccione al menos un archivo SVG");
    }
  };

  const handlePathClick = (e) => {
    const target = e.target;
    if (
      target.tagName === "path" ||
      target.tagName === "polygon" ||
      target.tagName === "circle"
    ) {
      const pathElement = target;
      const id = pathElement.getAttribute("id");
      setClickedId(id === clickedId ? null : id);
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
      const setStylesForElements = (elements) => {
        elements.forEach((element) => {
          element.removeAttribute("style");
          element.classList.remove("selected-path");
          if (element.getAttribute("id") === clickedId) {
            element.classList.add("selected-path");
          } else {
            element.classList.add(pathStyleClass);
          }
        });
      };
      setStylesForElements(svgPaths);
      setStylesForElements(svgPolygon);
      setStylesForElements(svgCircle);

      const modifiedSvgContent = container.innerHTML;
      setFile({ content: modifiedSvgContent });
      const modifiedSvgBlob = new Blob([modifiedSvgContent], {
        type: "image/svg+xml",
      });
      const modifiedSvgFile = new File([modifiedSvgBlob], "modified.svg", {
        type: "image/svg+xml",
      });
      setModifiedFile(modifiedSvgFile);
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
  }, [file.content, pathStyleClass, clickedId]);

  const mostrarBotonSubir = imageData.files.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white pl-6 pr-6 flex flex-col rounded-lg shadow-lg w-full  md:w-3/4 lg:w-1/2 pb-4">
        <div className="flex flex-col ">
          <div className="flex items-center border-b-[1px] border-gray-600 p-4 mb-4">
            <button
              type="button"
              onClick={() => {
                ModalSvg();
              }}
              className="flex items-center justify-center p-1 rounded-full  hover:bg-gray-200"
            >
              <MdClose className="text-gray-600 w-4 h-4 " />
            </button>
            <div className="flex-1">
              <p className="text-center">Selecciona archivos SVG</p>
            </div>
          </div>
          <style>{stylesSvg}</style>

          {!file.content && previewSvgsSave.length == 0 ? (
            <label
              htmlFor="fileInput"
              className="h-[420px] flex flex-col hover:bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300 bg-white cursor-pointer"
            >
              <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-full">
                <MdOutlineAddPhotoAlternate className="text-gray-400 w-8 h-8" />
              </div>
            </label>
          ) : null}
          {previewSvgsSave.length > 0 ? (
            <object
              data={previewSvgsSave[0].url}
              type="image/svg+xml"
              className="h-[400px]"
            >
              Tu navegador no admite la visualización de SVG.
            </object>
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
            {imageData.files.length > 0 || previewSvgsSave.length > 0 ? (
              <button
                onClick={handleRemoveImage}
                className="text-red-500 text-xs cursor-pointer"
              >
                Eliminar Svg
              </button>
            ) : null}
          </div>
          <Button onClick={handleUpload} type="button">
            Subir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadSvg;
