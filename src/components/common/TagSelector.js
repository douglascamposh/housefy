import { useState } from 'react';
import { MdClose, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const TagSelector = ({ options, placeholder, selectedTags, onSelectedTagsChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      const updatedTags = selectedTags.filter((t) => t !== tag);
      onSelectedTagsChange(updatedTags);
    } else {
      toggleDropdown();
      const newSelectedTags = [...selectedTags, tag];
      onSelectedTagsChange(newSelectedTags);
    }
  };

  const handleInnerClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="space-y-2 relative">
      <div className="relative">
        <div
          className="bg-gray-300 border rounded-lg shadow-lg flex justify-between p-3 md:p-2 min-w-[150px] " // Ajustar min-width y max-width según tus necesidades
          onClick={toggleDropdown}
        >
          {selectedTags && selectedTags.length > 0 ? (
            <div className="flex flex-wrap">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="px-2 mt-1 py-1 mr-1 sm:px-3 sm:py-2 sm:mr-2 sm:h-auto bg-green-500  rounded-[10px] text-white flex items-center text-sm sm:text-xs" // Ajustar las clases según tus necesidades
                  onClick={handleInnerClick}
                >
                  {tag}
                  <div className="bg-white h-full w-[1px] ml-1 sm:ml-2"></div>
                  <button
                    className="ml-1 sm:ml-2 text-white"
                    onClick={() => handleToggleTag(tag)}
                  >
                    <MdClose />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <label className="text-gray-500">{placeholder}</label>
          )}
          {isOpen ? (
            <MdArrowDropUp className="text-xl mx-2" />
          ) : (
            <MdArrowDropDown className="text-xl mx-2" />
          )}
        </div>
        {isOpen && (
          <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
            <ul className="p-2">    
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleToggleTag(option)}
                  className={`cursor-pointer p-2 ${
                    selectedTags && selectedTags.includes(option) ? 'bg-green-200' : ''
                  }`}
                >
                  {option}
                  {selectedTags && selectedTags.includes(option) && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSelector;
