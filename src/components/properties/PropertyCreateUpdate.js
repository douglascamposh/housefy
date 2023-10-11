import React from "react";
import { useRouter } from 'next/navigation'
import { useCreatePropertiesMutation, useUpdatePropertiesMutation, useDeleteImagesMutation } from '@/redux/services/propertiesApi';
import PropertyForm from '@/components/Form/PropertyForm';
import { Logger } from "@/services/Logger";
import { images } from "../../../next.config";

const PropertyCreateUpdate = ({data, saveProperty, isLoading}) => {
  const router = useRouter();

  const [ deleteImages ] = useDeleteImagesMutation();

  const handleNavigation = async (imagesToDelete) => {
    if (imagesToDelete.length > 0){
      try {
        for (const image of imagesToDelete) {
          await deleteImages(image.id);
        }
      } catch (error) {
        Logger.error("Error al eliminar la imagen: ", error);
      }
    }
    router.push('/properties');
  };

  const registerProperty = async(payload)=> {
    try {
      await saveProperty(payload);
      handleNavigation();
    } catch (error) {
      Logger.error('there was an error at create', error);
      toast.error('Hubo un error al crear la propiedad.')
    }
  }

  const updateProperties = async(payload)=> {
    try {
      await saveProperty({
        id: payload.id,
        updateProperties: payload
      });
      handleNavigation();
    } catch (error) {
      Logger.error('there was an error at update', error);
      toast.error('Hubo un error al actualizar la propiedad.')
    }
  }

  return (
    <PropertyForm
      data={data}
      isLoading={isLoading}
      onSubmit={!data.id ? registerProperty : updateProperties}
      onCancel={handleNavigation}
    />
  );

}
export default PropertyCreateUpdate;