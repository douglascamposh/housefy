import { useState } from 'react';
import { MdClose, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { Colors } from "@/app/constants/Styles";

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

  const { containerStyles, selectTagStyle, listTagStyle, containerTag, separatorStyle, buttonStyle, labelStyle, arrowStyle, optionStyle, containerList, cursorStyle, checkStyle } = styles;

  return (
    <div className={`${containerStyles}`}>
      <div
        className={`${selectTagStyle}`} // Ajustar min-width y max-width según tus necesidades
        onClick={toggleDropdown}
      >
        {selectedTags && selectedTags.length > 0 ? (
          <div className={`${listTagStyle}`}>
            {selectedTags.map((tag) => (
              <div
                key={tag}
                className={`${containerTag}`} // Ajustar las clases según tus necesidades
                onClick={handleInnerClick}
              >
                {tag}
                <div className={`${separatorStyle}`}></div>
                <button className={`${buttonStyle}`} onClick={() => handleToggleTag(tag)}>
                  <MdClose />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <label className={`${labelStyle}`}>{placeholder}</label>
        )}
        {isOpen ? (
          <MdArrowDropUp className={`${arrowStyle}`} />
        ) : (
          <MdArrowDropDown className={`${arrowStyle}`} />
        )}
      </div>
      {isOpen && (
        <div className={`${optionStyle}`}>
          <ul className={`${containerList}`}>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleToggleTag(option)}
                className={`${cursorStyle} ${selectedTags && selectedTags.includes(option) 
                  ? Colors.backgroundGreen : ''}`}
              >
                {option}
                {selectedTags && selectedTags.includes(option) && (
                  <span className={`${checkStyle}`}>✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  containerStyles: `
    space-y-2 
    relative
  `,
  selectTagStyle: `
    bg-gray-300 
    border 
    rounded-lg 
    shadow-lg 
    flex 
    justify-between 
    p-3 
    md:p-2 
    min-w-[150px] 
  `,
  listTagStyle: `
    flex 
    flex-wrap
  `,
  containerTag: `
    px-2 
    mt-1 
    py-1 
    mr-1 
    sm:px-3 
    sm:py-2 
    sm:mr-2 
    sm:h-auto 
    bg-green-500  
    rounded-[10px] 
    text-white 
    flex 
    items-center 
    text-sm 
    sm:text-xs
  `,
  separatorStyle: `
    bg-white 
    h-full 
    w-[1px] 
    ml-1 
    sm:ml-2
  `,
  buttonStyle: `
    ml-1 
    sm:ml-2 
    text-white
  `,
  labelStyle: `
    text-gray-500
  `,
  arrowStyle: `
    text-xl 
    mx-2
  `,
  optionStyle: `
    absolute 
    mt-2 
    w-full 
    bg-white 
    border 
    rounded-lg 
    shadow-lg z-10
  `,
  containerList: `
   p-2
  `,
  cursorStyle: `
    cursor-pointer
    p-2
  `,
  checkStyle: `
    ml-2 
    text-green-500
  `,
};

export default TagSelector;
