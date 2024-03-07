import React from "react";
import { useRouter } from 'next/navigation'
import { useCreatePropertiesMutation, useDeleteImagesMutation, useUpdatePropertiesMutation } from '@/redux/services/propertiesApi';
import PropertyForm from '@/components/Form/PropertyForm';
import { Logger } from "@/services/Logger";

const PropertyCreateUpdate = ({data, saveProperty, isLoading}) => {
  const router = useRouter();

  const [deleteImages] = useDeleteImagesMutation();

  const handleNavigation = async (imagesToDelete) => {

    router.push('/properties');

    if (imagesToDelete.length > 0){
      try {
        for (const image of imagesToDelete) {
          const response = await deleteImages(image.id);
          console.info(response, "The response is here");          
        }
      } catch (error) {
        Logger.error("Error al eliminar la imagen: ",error);
      }
      // promise = promises.all()
      //   .then()
      //   .catch()
      //   rotuer.push()
    }    
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