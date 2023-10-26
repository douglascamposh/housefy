import { useDrop } from "react-dnd";

const DroppableBox = ({ onDrop, onRemove, children }) => {
  const [, drop] = useDrop({
    accept: "box",
    drop: (item) => onDrop(item.index),
  });

  return (
    <div className="relative" ref={drop} onClick={onRemove}>
      {children}
    </div>
  );
};
export default DroppableBox;
