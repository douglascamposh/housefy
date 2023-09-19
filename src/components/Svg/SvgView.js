import { Logger } from "@/services/Logger";
import React, { useState, useRef, useEffect } from "react";
import { FaSearchPlus, FaSearchMinus, FaEdit, FaExclamationTriangle } from "react-icons/fa";
import { stylesSvg } from "@/app/constants/stylesSvg";
const SvgView = ({ svg, arraySubProperties, onPathSelect,ModalSvg }) => {
  const [fileContent, setFileContent] = useState(null);
  const [zoom, setZoom] = useState(1);
  const svgContainerRef = useRef(null);
  const [clickedId, setClickedId] = useState(null);
  const [pathStyleClass, setPathStyleClass] = useState("default-path-style");
  const [svgIds, setSvgIds] = useState([]);
  const [showModalWarning, setShowModalWarning] = useState(false);
  const svgIdsAvailableTrue = arraySubProperties
    .filter((item) => item.isAvailable === true)
    .map((item) => item.svgId);
  const svgIdsAvailableFalse = arraySubProperties
    .filter((item) => item.isAvailable !== true)
    .map((item) => item.svgId);
  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };
  const openModalUpdate=()=>{
    setShowModalWarning(true)
  }
  const handleContinue = () => {
    ModalSvg()
    setShowModalWarning(false);
  };
  const handleCancel = () => {
    setShowModalWarning(false);
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
      if (id === clickedId) {
        onPathSelect(null);
        setClickedId(null);
      } else {
        setClickedId(id);
        onPathSelect(id);
      }
    }
  };

  const applyStylesToPaths = () => {
    if (fileContent && svgContainerRef.current) {
      const container = document.createElement("div");
      container.innerHTML = fileContent;
      const svgSelect = container.querySelector("svg");
      const svgPolygon = container.querySelectorAll("polygon");
      const svgPaths = container.querySelectorAll("path");
      const svgCircle = container.querySelectorAll("circle");
      svgSelect.style.width = "100%";
      svgSelect.style.height = "100%";
      svgPaths.forEach((path) => {
        path.classList.remove("selected-path");
        path.removeAttribute("style");
        const id = path.getAttribute("id");
        if (id === clickedId) {
          path.classList.remove("available-path");
          path.classList.remove("not-available-path");
          path.classList.add("selected-path");
        } else if (svgIdsAvailableTrue.includes(id)) {
          path.classList.remove("selected-path");
          path.classList.add("available-path");
        } else if (svgIdsAvailableFalse.includes(id)) {
          path.classList.remove("selected-path");

          path.classList.add("not-available-path");
        } else {
          path.classList.add(pathStyleClass);
        }
      });
      svgPolygon.forEach((polygon) => {
        polygon.removeAttribute("style");
        polygon.classList.remove("selected-path");
        const id = polygon.getAttribute("id");
        if (id === clickedId) {
          polygon.classList.remove("available-path");
          polygon.classList.remove("not-available-path");

          polygon.classList.add("selected-path");
        } else if (svgIdsAvailableTrue.includes(id)) {
          polygon.classList.remove("selected-path");

          polygon.classList.add("available-path");
        } else if (svgIdsAvailableFalse.includes(id)) {
          polygon.classList.remove("selected-path");

          polygon.classList.add("not-available-path");
        } else {
          polygon.classList.add(pathStyleClass);
        }
      });
      svgCircle.forEach((circle) => {
        circle.removeAttribute("style");
        circle.classList.remove("selected-path");
        const id = circle.getAttribute("id");
        if (id === clickedId) {
          circle.classList.remove("available-path");
          circle.classList.remove("not-available-path");

          circle.classList.add("selected-path");
        } else if (svgIdsAvailableTrue.includes(id)) {
          circle.classList.remove("selected-path");

          circle.classList.add("available-path");
        } else if (svgIdsAvailableFalse.includes(id)) {
          circle.classList.remove("selected-path");

          circle.classList.add("not-available-path");
        } else {
          circle.classList.add(pathStyleClass);
        }
      });
      const modifiedSvgContent = container.innerHTML;
      setFileContent(modifiedSvgContent);
    }
  };

  useEffect(() => {
    applyStylesToPaths();
    if (fileContent && svgContainerRef.current) {
      svgContainerRef.current.addEventListener("click", handlePathClick);
    }

    return () => {
      if (svgContainerRef.current) {
        svgContainerRef.current.removeEventListener("click", handlePathClick);
      }
    };
  }, [fileContent, pathStyleClass, clickedId]);



  useEffect(() => {
    if (svg.length > 0) {
      loadSvgFromUrl(svg[0].url);
    }
  }, [svg]);

  const loadSvgFromUrl = async (url) => {
    try {
      const response = await fetch(url, {
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener el archivo SVG");
      }

      const svgContent = await response.text();
      setFileContent(svgContent);

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgContent, "image/svg+xml");
      const svgElement = doc.documentElement;

      const pathElements = svgElement.querySelectorAll("path");

      const pathIds = Array.from(pathElements).map((path) =>
        path.getAttribute("id")
      );

      setSvgIds(pathIds);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div className="svg-container p-4 md:p-8 w-full">
      <style>{stylesSvg}</style>
      {showModalWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo oscuro */}
          <div className="fixed inset-0 bg-black opacity-50"></div>

          <div className="bg-white p-6 max-w-md mx-auto rounded-lg shadow-xl relative z-10">
            <div className="flex items-center justify-center text-4xl text-yellow-500">
              <FaExclamationTriangle/>
            </div>
            <p className="text-xl text-gray-700 mt-4 mb-6">
              Los lotes/departamentos asociados al plano serán eliminados si se actualiza el plano.
            </p>
            <div className="flex justify-center">
              <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded">
                Cancelar
              </button>
              <button onClick={handleContinue} className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded ">
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center w-full mb-4">
        <div className="flex items-center ml-2 md:ml-4 mb-2 md:mb-0">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#2d0df1" }}
          ></div>
          Seleccionado
        </div>
        <div className="flex items-center ml-2 md:ml-4 mb-2 md:mb-0">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#2db303" }}
          ></div>
          Disponible
        </div>
        <div className="flex items-center ml-2 md:ml-4 mb-2 md:mb-0">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#e90107" }}
          ></div>
          Vendido
        </div>
        <div className="flex items-center ml-2 md:ml-4">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#313231" }}
          ></div>
          No disponible
        </div>
        <div className="absolute mt-[60px] ml-[200px] md:ml-[-650px]  md:mt-[0px] space-x-2 flex ">
          <button
            className="bg-white border border-gray-400 rounded p-2 hover:bg-gray-200 cursor-pointer"
            onClick={handleZoomIn}
          >
            <FaSearchPlus />
          </button>
          <button
            className="bg-white border border-gray-400 rounded p-2 hover:bg-gray-200 cursor-pointer"
            onClick={handleZoomOut}
          >
            <FaSearchMinus />
          </button>
          <button
            className="bg-white border border-gray-400 rounded p-2 hover:bg-gray-200 cursor-pointer"
            onClick={()=>openModalUpdate()}
          >
            <FaEdit/>
          </button>
        </div>
      </div>

      <div
        ref={svgContainerRef}
        className="svg-content-container"
        style={{
          width: "100%",
          height: "auto",
          backgroundColor:"#F1F1F1",
          maxHeight: "80vh",
          borderRadius:"10px",
          overflow: "auto",
        }}
      >


        {fileContent && (
          <div
            dangerouslySetInnerHTML={{ __html: fileContent }}
            className={`svg-content ${pathStyleClass}`}
            style={{
              width: "100%",
              height: "auto",
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          />
        )}
      </div>
      
    </div>
  );
};

export default SvgView;