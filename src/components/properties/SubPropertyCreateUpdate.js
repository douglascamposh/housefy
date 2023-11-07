import React from "react";
import { Logger } from "@/services/Logger";
import SubPropertyForm from "../Form/SubPropertyForm";
import {
  useCreateSubPropertiesMutation,
  useUpdateSubPropertiesMutation,
} from "@/redux/services/propertiesApi";
import { toast } from "react-toastify";

const SubPropertyCreateUpdate = ({
  idSvg,
  idProperty,
  data,
  newSubproperty,
  onClose,
  onCloseForm,
}) => {
  const [createSubProperty, { isLoading }] = useCreateSubPropertiesMutation();
  const [updateSubProperty, { isLoading: updateLoading }] =
    useUpdateSubPropertiesMutation({
      fixedCacheKey: "shared-update-post",
    });
  const registerSubProperty = async (payload) => {
    try {
      const response = await createSubProperty({
        id: idProperty,
        newSubProperties: payload,
      });
      if (response.data) {
        const dataNew = { ...response.data };
        dataNew.isAvailable = true;
        newSubproperty(dataNew);
        toast.success("Nueva sub propiedad creada");
        onClose();
      } else {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      Logger.error("there was an error at create", error);
      toast.error("Hubo un error al crear la propiedad.");
    }
  };

  const updateSubProperties = async (payload) => {
    const newData = {
      id: payload.id,
      code: payload.code,
      size: payload.size,
      price: payload.price,
      svgId: payload.svgId,
      commonArea: payload.commonArea,
    };
    try {
      await updateSubProperty({
        id: idProperty,
        subId: newData.id,
        updateSubProperties: newData,
      });
      toast.success("Sub propiedad actualizada correctamente");
      onClose();
    } catch (error) {
      Logger.error("there was an error at update", error);
      toast.error("Hubo un error al actualizar la propiedad.");
    }
  };

  return (
    <SubPropertyForm
      data={data}
      isLoading={isLoading}
      onSubmit={!data ? registerSubProperty : updateSubProperties}
      idSvg={idSvg}
      onClose={onClose}
    ></SubPropertyForm>
  );
};
export default SubPropertyCreateUpdate;
