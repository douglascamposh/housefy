import { useDrag } from "react-dnd";

const DraggableBox = ({ option, index }) => {
  const [, ref] = useDrag({
    type: "box",
    item: { index },
  });

  return (
    <div
      ref={ref}
      className="border-[2px] border-gray-400 bg-gray-100 text-gray-600 font-semibold p-4 m-2 cursor-move rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
    >
      {option.text}
    </div>
  );
};
export default DraggableBox;
