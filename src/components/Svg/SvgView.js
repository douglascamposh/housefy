import React, { useState, useRef, useEffect } from "react";

const SvgView = ({svg}) => {
  const [fileContent, setFileContent] = useState(null);
  const svgContainerRef = useRef(null);
  const [clickedId, setClickedId] = useState(null);

  const handlePathClick = (e) => {
    const target = e.target;
    if (target.tagName === "path") {
      const pathElement = target;
      pathElement.style.fill = "yellow";
      const id = pathElement.getAttribute("id");
      setClickedId(id);
    }
  };

  const applyStylesToPaths = () => {
    if (fileContent && svgContainerRef.current) {
      const container = document.createElement("div");
      container.innerHTML = fileContent;
      const svgElement = container.querySelector("svg");
      svgElement.setAttribute("id", "svg-container");
      const svgPaths = container.querySelectorAll("path");

      svgPaths.forEach((path) => {
        path.style.fill = "green";
        path.style.stroke = "blue";
        path.style.strokeWidth = "2px";
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
  }, [fileContent]);
  const loadSvgFromUrl = async (url) => {
    try {
      const response = await fetch(url, {
        cache: 'no-cache',
      });
  
      if (!response.ok) {
        throw new Error('No se pudo obtener el archivo SVG');
      }
  
      const svgContent = await response.text();
      setFileContent(svgContent);
    } catch (error) {
      console.error('Error al cargar el SVG:', error);
    }
  };
  
  

  useEffect(() => {
    // No funciona con este link
    // const svgUrl="https://www.svgrepo.com/show/308391/argentina-argentina.svg"
    // No funciona con este link
    // const svgUrl="https://housefy-s3-dev.s3.amazonaws.com/properties/1693600193329-arg.svg"
    // Si funciona este link
    const svgUrl = "https://upload.wikimedia.org/wikipedia/commons/e/e6/Bolivia_Blank_Map.svg";
    loadSvgFromUrl(svgUrl);
  }, []);

  return (
    <div ref={svgContainerRef} style={{ width: "200px", height: "200px" }}>
      {clickedId}
      <div dangerouslySetInnerHTML={{ __html: fileContent || "" }} />
    </div>
  );
};

export default SvgView;
