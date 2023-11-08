import { Logger } from "@/services/Logger";
import React, { useState, useRef, useEffect } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaEdit,
  FaSearchLocation,
} from "react-icons/fa";
import { stylesSvg } from "@/app/constants/stylesSvg";
import ConfirmationDialog from "../ConfirmationDialog";
import { sale_status } from "@/app/constants/constants";
const SvgView = ({ svg, arraySubProperties, onPathSelect, ModalSvg }) => {
  const [fileContent, setFileContent] = useState(null);
  const svgContainerRef = useRef(null);
  const [clickedId, setClickedId] = useState(null);
  const [pathStyleClass, setPathStyleClass] = useState("default-path-style");
  const [svgIds, setSvgIds] = useState([]);
  const [showModalWarning, setShowModalWarning] = useState(false);

  const svgIdsAvailableTrue = arraySubProperties
    .filter((item) => item.isAvailable === true)
    .map((item) => item.svgId);

  const svgIdsAvailableFalse = arraySubProperties
    .filter(
      (item) =>
        item.isAvailable !== true &&
        !item.commonArea &&
        item.status == sale_status.sold
    )
    .map((item) => item.svgId);

  const svgIdsCommonArea = arraySubProperties
    .filter((item) => item.commonArea)
    .map((item) => item.svgId);

  const svgIdsReserved = arraySubProperties
    .filter(
      (item) =>
        item.isAvailable !== true &&
        !item.commonArea &&
        item.status == sale_status.reserved
    )
    .map((item) => item.svgId);

  const openModalUpdate = () => {
    setShowModalWarning(true);
  };
  const handleContinue = () => {
    ModalSvg();
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
          path.classList.remove("common-area-path");
          path.classList.remove("reserved-path");
          path.classList.add("selected-path");
        } else if (svgIdsAvailableTrue.includes(id)) {
          path.classList.remove("selected-path");
          path.classList.add("available-path");
        } else if (svgIdsAvailableFalse.includes(id)) {
          path.classList.remove("selected-path");
          path.classList.add("not-available-path");
        } else if (svgIdsCommonArea.includes(id)) {
          path.classList.remove("selected-path");
          path.classList.add("common-area-path");
        } else if (svgIdsReserved.includes(id)) {
          path.classList.remove("selected-path");
          path.classList.add("reserved-path");
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
          polygon.classList.remove("common-area-path");
          polygon.classList.remove("reserved-path");

          polygon.classList.add("selected-path");
        } else if (svgIdsAvailableTrue.includes(id)) {
          polygon.classList.remove("selected-path");
          polygon.classList.add("available-path");
        } else if (svgIdsAvailableFalse.includes(id)) {
          polygon.classList.remove("selected-path");
          polygon.classList.add("not-available-path");
        } else if (svgIdsCommonArea.includes(id)) {
          polygon.classList.remove("selected-path");
          polygon.classList.add("common-area-path");
        } else if (svgIdsReserved.includes(id)) {
          polygon.classList.remove("selected-path");
          polygon.classList.add("reserved-path");
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
          circle.classList.remove("common-area-path");
          circle.classList.remove("reserved-path");

          circle.classList.add("selected-path");
        } else if (svgIdsAvailableTrue.includes(id)) {
          circle.classList.remove("selected-path");

          circle.classList.add("available-path");
        } else if (svgIdsAvailableFalse.includes(id)) {
          circle.classList.remove("selected-path");

          circle.classList.add("not-available-path");
        } else if (svgIdsCommonArea.includes(id)) {
          circle.classList.remove("selected-path");
          circle.classList.add("common-area-path");
        } else if (svgIdsReserved.includes(id)) {
          circle.classList.remove("selected-path");
          circle.classList.add("reserved-path");
        } else {
          circle.classList.add(pathStyleClass);
        }
      });
      const modifiedSvgContent = container.innerHTML;
      setFileContent(modifiedSvgContent);
    }
  };

  useEffect(() => {
    if (
      fileContent &&
      svgContainerRef.current &&
      pathStyleClass !== "selected-path"
    ) {
      applyStylesToPaths();
    }
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
    if (svg && svg[0]) {
      loadSvgFromUrl(svg[0]?.url);
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

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <>
        <button
          className="bg-white border border-gray-400 rounded p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => zoomIn()}
        >
          <FaSearchPlus />
        </button>
        <button
          className="bg-white border border-gray-400 rounded p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => zoomOut()}
        >
          <FaSearchMinus />
        </button>
        <button
          className="bg-white border border-gray-400 rounded p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => resetTransform()}
        >
          <FaSearchLocation />
        </button>
      </>
    );
  };

  return (
    <div className=" svg-container  w-full ">
      <style>{stylesSvg}</style>
      {showModalWarning && (
        <ConfirmationDialog
          isOpen={showModalWarning}
          onCancel={handleCancel}
          onConfirm={handleContinue}
          content="Los lotes/departamentos asociados al plano serán eliminados si se actualiza el plano."
        />
      )}
      <TransformWrapper>
        <div>
          <div className=" mx-5 absolute z-30 sm:flex sm:flex-col">
            <Controls></Controls>
            <button
              className="bg-white border border-gray-400 rounded p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => openModalUpdate()}
            >
              <FaEdit />
            </button>
          </div>
          <TransformComponent>
            <div
              ref={svgContainerRef}
              className="svg-content-container h-[45vh] sm:h-[100vh] p-[100px] sm:w-[100vw]"
              style={{
                backgroundColor: "#f1f1f1",
                maxHeight: "100vh",
                borderRadius: "10px",
              }}
            >
              {fileContent && (
                <div
                  dangerouslySetInnerHTML={{ __html: fileContent }}
                  className={`svg-content ${pathStyleClass}`}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </div>
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
};

export default SvgView;
