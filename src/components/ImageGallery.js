import React, { useState } from 'react';
import Image from 'next/image';
import { MdOutlineModeEditOutline,MdAdd } from "react-icons/md";
const ImageGallery = ({ images,toggleModal }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <Image
        width={2000} height={2000}
          src={selectedImage.url}
          alt="Imagen Ampliada"
          className="w-auto h-80 mb-2 border rounded"
        />
      </div>
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-16 h-16 border rounded cursor-pointer ${
              selectedImage.url === image.url ? 'border-primary' : 'border-gray-300'
            }`}
            onClick={() => selectImage(image)}
          >
            <Image width={1500} height={1500} src={image.url} alt={`Miniatura ${index}`} className="w-full h-full object-cover" />
          </div>
          
        ))}
        <button type='Button' onClick={()=>toggleModal(true)} className='text-4xl'>
          {images.length<6?
        <MdAdd/>  :<MdOutlineModeEditOutline/>
        }
          </button>
        
      </div>
    </div>
  );
};

export default ImageGallery;
