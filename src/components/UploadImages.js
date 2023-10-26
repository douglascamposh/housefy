import React, { useState, useEffect } from "react";
import { useUploadImagePropertiesMutation } from "@/redux/services/propertiesApi";
import { toast } from "react-toastify";
import { MdOutlineAddPhotoAlternate, MdClose } from "react-icons/md";
import Button from "./Form/Button";
import Image from "next/image";
import Spinner from "./Spinner";
import { useDeleteImagesMutation } from "@/redux/services/propertiesApi";
import { Logger } from "@/services/Logger";

const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];
const VALID_IMAGE_EXTENSION = ".jpg";

const UploadImages = ({ ImagesUploaded, ImagesSave, ModalImages }) => {
  const [imageData, setImageData] = useState({
    files: [],
    previewImages: [],
    urlImages: [],
  });
  const [previewImagesSave, setPreviewImagesSave] = useState(ImagesSave);
  const [uploadImageMutation, { isLoading }] =
    useUploadImagePropertiesMutation();
  const [deleteImages] = useDeleteImagesMutation();

  const validateImage = (file) => {
    return (
      SUPPORTED_IMAGE_TYPES.includes(file.type) ||
      file.name.endsWith(VALID_IMAGE_EXTENSION)
    );
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter(validateImage);

    if (validFiles.length > 0) {
      setImageData((prevState) => ({
        ...prevState,
        files: [...prevState.files, ...validFiles],
        previewImages: [
          ...prevState.previewImages,
          ...validFiles.map((file) => URL.createObjectURL(file)),
        ],
      }));
    } else {
      toast.error("Por favor selecciona archivos de imagen JPG");
    }
  };
  const handleDeleteImages = async (imagesArray) => {
    try {
      for (const image of imagesArray) {
        await deleteImages(image.id);
      }
    } catch (error) {
      Logger.error("Error al eliminar la imagen: ", error);
    }
  };

  const handleRemoveImage = (index, isPreviewSave) => {
    const newImages = isPreviewSave
      ? [...previewImagesSave]
      : [...imageData.previewImages];
    newImages.splice(index, 1);

    if (isPreviewSave) {
      setPreviewImagesSave(newImages);
    } else {
      setImageData((prevState) => ({
        ...prevState,
        files: prevState.files.filter((file, i) => i !== index),
        previewImages: newImages,
      }));
    }
  };

  const handleUpload = async () => {
    if (imageData.files.length + previewImagesSave.length > 0) {
      try {
        const arrayDeleted = ImagesSave.filter(
          (objeto) => !previewImagesSave.some((item) => item.id === objeto.id)
        );
        await handleDeleteImages(arrayDeleted);
        const promises = imageData.files.map(async (file) => {
          try {
            const response = await uploadImageMutation({ file }).unwrap();
            if (response.imageId) {
              return {
                id: response.imageId,
                url: response.url,
              };
            }
            return null;
          } catch (error) {
            Logger.error("Error at load images", error);
          }
        });

        const uploadResults = await Promise.allSettled(promises);
        const combinedImages = [
          ...previewImagesSave,
          ...uploadResults
            .filter((result) => result.status === "fulfilled" && result.value)
            .map((result) => result.value),
        ];
        const errorImgUpload = uploadResults.filter((img) => !img.value);
        setImageData((prevState) => ({
          ...prevState,
          urlImages: [...prevState.urlImages, ...combinedImages],
        }));
        ModalImages(false);
        if (errorImgUpload.length) {
          toast.error("Error en la carga de imágenes");
        } else {
          toast.success("Imagenes subidas exitosamente");
        }
        ImagesUploaded(combinedImages);
      } catch (error) {
        Logger.error("Error en la carga de imagenes: ", error);
        toast.error("Error en la carga de imágenes");
      }
    } else {
      toast.error("Seleccione al menos una imagen");
    }
  };

  const showUploadButton =
    imageData.files.length + previewImagesSave.length < 6;

  return (
    <div
      className="fixed inset-0 z-50 flex p-5 items-center justify-center bg-gray-700 bg-opacity-50"
      style={{ overflowY: "auto" }}
    >
      <div
        className={
          "bg-white pl-6 pr-6 flex flex-col rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 " +
          (imageData.files.length + previewImagesSave.length > 0
            ? ""
            : "md:h-3/4")
        }
      >
        <div className="flex items-center border-b-[1px] border-gray-600 p-4 mb-4">
          <button
            type="button"
            onClick={() => {
              ModalImages(false);
            }}
            className="flex items-center justify-center p-1 rounded-full  hover:bg-gray-200"
          >
            <MdClose className="text-gray-600 w-4 h-4 " />
          </button>
          <div className="flex-1">
            <p className="text-center">Selecciona imágenes</p>
          </div>
        </div>
        <div
          className="flex-1"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {isLoading ? (
            <div className="h-60  items-center justify-center">
              <Spinner />
              <label className="text-green-500 ml-3"> Subiendo imagenes</label>
            </div>
          ) : (
            <div className="h-full">
              {imageData.files.length + previewImagesSave.length > 0 ? (
                <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {previewImagesSave.map((previewImage, index) => (
                    <div
                      key={index}
                      className="mb-2 flex justify-center items-center  relative shadow-lg bg-white"
                    >
                      <Image
                        src={previewImage.url}
                        alt="Vista previa de la imagen"
                        width={130}
                        height={130}
                        className="w-auto h-[80px] md:h-[200px]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index, true)}
                        className="absolute bg-red-500 top-0 right-0 p-1 text-white"
                      >
                        <MdClose />
                      </button>
                    </div>
                  ))}
                  {imageData.previewImages.map((previewImage, index) => (
                    <div
                      key={index}
                      className="mb-2 flex h-100 justify-center items-center relative shadow-lg bg-white"
                    >
                      <Image
                        src={previewImage}
                        alt="Vista previa de la imagen"
                        width={130}
                        height={130}
                        className="w-auto h-[80px] md:h-[200px]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index, false)}
                        className="absolute bg-red-500 top-0 right-0 p-1 text-white"
                      >
                        <MdClose />
                      </button>
                    </div>
                  ))}
                  {showUploadButton && (
                    <div
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="h-[80px] md:h-[200px] flex flex-col hover:bg-gray-100 items-center justify-center  border-2 border-dashed border-gray-300 bg-white cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-full">
                        <MdOutlineAddPhotoAlternate className="text-gray-400 w-8 h-8" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => document.getElementById("fileInput").click()}
                  className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 bg-white cursor-pointer"
                >
                  <div className="text-lg text-center mb-2">
                    Selecciona archivos JPG para subir
                  </div>
                  <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-full">
                    <MdOutlineAddPhotoAlternate className="text-gray-400 w-8 h-8" />
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    Elegir archivos
                  </div>
                </div>
              )}
              <input
                id="fileInput"
                type="file"
                accept=".jpg, .jpeg"
                multiple
                onChange={handleFileChange}
                disabled={isLoading || !showUploadButton}
                className="sr-only"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between m-4">
          {imageData.files.length + previewImagesSave.length >= 6 ? (
            <label className="text-red-500 text-xs">
              Has alcanzado el límite máximo de imágenes seleccionadas.
            </label>
          ) : (
            <div />
          )}
          <Button onClick={handleUpload} type="button" disabled={isLoading}>
            Subir imagenes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
