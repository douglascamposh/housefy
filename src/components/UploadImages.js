import React, { useState } from 'react';
import { useUploadImagePropertiesMutation } from '@/redux/services/propertiesApi';
import { toast } from 'react-toastify';
import Button from './Form/Button';
import Image from 'next/image';
import Spinner from './Spinner';
import { MdOutlineAddPhotoAlternate, MdClose } from 'react-icons/md';

const UploadImages = ({ entityId }) => {
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [urlImages, setUrlImages] = useState([]);
  const [uploadImageMutation, { isLoading }] = useUploadImagePropertiesMutation();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter(
      (file) => file.type.startsWith('image/') && file.name.endsWith('.jpg')
    );

    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setPreviewImages((prevImages) => [
        ...prevImages,
        ...validFiles.map((file) => URL.createObjectURL(file)),
      ]);
    } else {
      toast.error('Por favor selecciona archivos de imagen JPG');
    }
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const handleUpload = async () => {
    if (files.length>0){
        try {
            const promises = files.map(async (file) => {
              const response = await uploadImageMutation({
                file,
                entityId: entityId,
              });
              return response.data ? response.data.url : null;
            });
      
            const uploadedUrls = await Promise.all(promises);
            setUrlImages((prevUrls) => [...prevUrls, ...uploadedUrls]);
            toast.success('Imágenes subidas exitosamente');
            console.log(uploadedUrls)
          } catch (error) {
            toast.error('Error en la carga de imágenes');
          }    
    }else{
        toast.error('Seleccione al menos una imagen');

    }
    
  };

  const showUploadButton = files.length < 6;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full">
      {isLoading ? (
        <div className="h-60 flex items-center justify-center">
          <Spinner />
          <label className="text-blue-500 ml-3"> Subiendo imagenes</label>
        </div>
      ) : (
        <div>
          {files.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previewImages.map((previewImage, index) => (
                <div key={index} className="mb-2 flex justify-center items-center relative shadow-lg bg-white">
                  <Image src={previewImage} alt="Vista previa de la imagen" width={100} height={100} className="m-auto" />
                  <button onClick={() => handleRemoveImage(index)} className="absolute bg-red-500 top-0 right-0 p-1 text-white">
                    <MdClose />
                  </button>
                </div>
              ))}
              {showUploadButton && (
                <div onClick={() => document.getElementById('fileInput').click()} className="flex flex-col hover:bg-gray-100 items-center justify-center h-48 border-2 border-dashed border-gray-300 bg-white cursor-pointer">
                  <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-full">
                    <MdOutlineAddPhotoAlternate className="text-gray-400 w-8 h-8" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div onClick={() => document.getElementById('fileInput').click()} className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 bg-white cursor-pointer">
              <div className="text-lg text-center mb-2">Selecciona archivos JPG para subir</div>
              <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-full">
                <MdOutlineAddPhotoAlternate className="text-gray-400 w-8 h-8" />
              </div>
              <div className="text-sm text-gray-400 mt-2">Elegir archivos</div>
            </div>
          )}

          <input id="fileInput" type="file" accept=".jpg" multiple onChange={handleFileChange} disabled={isLoading || !showUploadButton} className="sr-only" />
          <div className="flex items-center justify-between mt-4">
            {files.length >= 6 && (
              <label className="text-red-500 text-xs">
                Has alcanzado el límite máximo de imágenes seleccionadas.
              </label>
            )}
            <Button onClick={handleUpload} disabled={isLoading} label="Subir imágenes" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImages;
