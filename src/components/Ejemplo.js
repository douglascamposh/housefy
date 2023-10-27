import React from "react";
import { useState } from "react";
function Ejemplo() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseClick = (event) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
    setIsVisible(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      onClick={handleMouseClick}
    >
      {isVisible && (
        <div
          className="absolute bg-white p-4 shadow-md rounded-md"
          style={{ left: position.x, top: position.y }}
        >
          Contenido del div que se mostrará en la posición del clic.
        </div>
      )}
    </div>
  );
}

export default Ejemplo;
