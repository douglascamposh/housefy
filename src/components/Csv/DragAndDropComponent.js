import React, { useState } from "react";
import DraggableBox from "../DragAndDropMapper/DraggableBox";
import DroppableBox from "../DragAndDropMapper/DroppableBox";

export const DragAndDropComponent = ({
  headers,
  handleSelectedHeaders,
  headersMapping,
}) => {
  const arrayOptions = headers.map((element, index) => ({
    id: index + 1,
    text: element,
  }));

  const [targetBoxes, setTargetBoxes] = useState(
    Array(headersMapping.length).fill(null)
  );
  const [availableOptions, setAvailableOptions] = useState(arrayOptions);

  const handleDrop = (index, optionIndex) => {
    const updatedBoxes = [...targetBoxes];
    updatedBoxes[index] = availableOptions[optionIndex];
    setTargetBoxes(updatedBoxes);

    const updatedAvailableOptions = availableOptions.filter(
      (option, i) => i !== optionIndex
    );
    setAvailableOptions(updatedAvailableOptions);
    const headersTextArray = updatedBoxes.map((header) =>
      header ? header.text : null
    );
    handleSelectedHeaders(headersTextArray);
  };

  const handleRemoveOption = (option) => {
    const updatedBoxes = targetBoxes.map((box) =>
      box === option ? null : box
    );
    setTargetBoxes(updatedBoxes);

    setAvailableOptions([...availableOptions, option]);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col ">
        <p className="text-gray-500">
          ¡Arrastre y suelte para asignar encabezados a los campos siguientes!
        </p>
        <div className="w-full sm:w-full flex flex-wrap">
          {availableOptions.map((option, index) => (
            <DraggableBox key={option.id} option={option} index={index} />
          ))}
        </div>

        <div className="flex flex-wrap mt-3">
          {targetBoxes.map((box, index) => (
            <DroppableBox
              key={index}
              onDrop={(optionIndex) => handleDrop(index, optionIndex)}
              onRemove={box ? () => handleRemoveOption(box) : null}
            >
              <p className="text-center font-bold">
                {headersMapping[index]["text"]}
              </p>
              {box ? (
                <div className="cursor-pointer border-[2px] border-green-500 bg-green-100 text-black font-semibold w-full sm:w-40 h-20 m-2 flex justify-center items-center rounded-lg shadow-lg">
                  {box.text}
                </div>
              ) : (
                <div className="border-dashed cursor-pointer border-2 border-gray-800 text-gray-800 w-full sm:w-40 h-20 m-2 flex justify-center items-center rounded-lg bg-white shadow-lg">
                  Arrastre aquí
                </div>
              )}
            </DroppableBox>
          ))}
        </div>
      </div>
    </div>
  );
};
