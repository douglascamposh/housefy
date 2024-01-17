import React from "react";
import { MdLocationOn, MdOutlineHouse ,MdOutlineModeEditOutline,MdDeleteOutline} from "react-icons/md";
import { useRouter } from "next/navigation";
import Carousel from "../../../components/Carrousel";
import { Padding } from "@/app/constants/Styles";

const PropertyListItem = ({ name, images, address, description, id, propertiesAvailable }) => {
  const router = useRouter();
  const { 
    containerStyle, 
    imageStyle, 
    actionStyle, 
    buttonStyle, 
    iconStyle, 
    titleStyle, 
    descriptionStyle, 
    containerLocaltionItemStyle, 
    pinStyle, 
    addressTextStyle,
    containerHomeItemStyle,
    propertyTextStyle,
  } = styles;

  const handleCardClick = () => {
    router.push(`/properties/details/${id}`);
  };
  const handleEditClick = (event) => {
    event.stopPropagation(); 
    router.push(`/properties/update/${id}`);
  };

  return (
    <div className={`${containerStyle}`} onClick={handleCardClick}>
      <div className={`${imageStyle}`}>
        {images && images.length > 0 && (
          <Carousel images={images} height="200px" />
        )}
      </div>
      <div className={`${actionStyle}`}>
          <button
            onClick={handleEditClick}
            className={`${buttonStyle}`}
          >
            <MdOutlineModeEditOutline className={`${iconStyle}`} />
          </button>
          <button
            onClick={handleEditClick}
            className={`${buttonStyle}`}
          >
            <MdDeleteOutline className={`${iconStyle}`} />
          </button>
      </div>
      <div className={`${Padding.cardPropertyBody}`}>
        <h4 className={`${titleStyle}`}>
          {name}
        </h4>
        <p className={`${descriptionStyle}`}>{description}</p>
        <div className={`${containerLocaltionItemStyle}`}>
          <MdLocationOn className={`${pinStyle}`} />
          <p className={`${addressTextStyle}`}>{address}</p>
        </div>
        <div className={`${containerHomeItemStyle}`}>
          <MdOutlineHouse></MdOutlineHouse>
          <p className={`${propertyTextStyle}`}> {propertiesAvailable} propiedades</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  containerStyle: `
    relative 
    rounded-lg 
    overflow-hidden 
    cursor-pointer
  `,
  imageStyle: `
    relative 
    h-48 
    md:h-58 
    lg:h-62
  `,
  actionStyle: `
    flex 
    absolute 
    top-4 
    right-4
  `,
  buttonStyle: `
    flex 
    items-center 
    m-1 
    justify-center 
    w-8 
    h-8 
    rounded-full 
    bg-white 
    hover:bg-gray-300 
    shadow-md
  `,
  iconStyle: `
    text-gray-600 
    text-lg
  `,
  titleStyle: `
    uppercase 
    line-clamp-2 
    h-[50px] 
    text-xl 
    font-semibold 
    text-primary 
    mb-2
  `,
  descriptionStyle: `
    text-sm 
    text-gray-500 
    h-[40px] 
    line-clamp-2 
    mb-4
  `,
  containerLocaltionItemStyle: `
  flex 
  items-center 
  text-gray-600
  `,
  pinStyle: `
    text-xl 
    flex-shrink-0
  `,
  addressTextStyle: `
    ml-2 
    truncate 
    text-sm
  `,
  containerHomeItemStyle: `
    flex 
    mt-2 
    space-x-2
  `,
  propertyTextStyle: `
    text-xs
  `,
};

export default PropertyListItem;
