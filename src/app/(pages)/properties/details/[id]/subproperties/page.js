"use client";
import React, { useState, useEffect } from "react";
import {
  useGetPropertiesByIdQuery,
  useGetSubPropertiesQuery,
  useUpdatePropertiesMutation,
  useDeleteImagesMutation,
} from "@/redux/services/propertiesApi";
import ServerErrorComponent from "@/components/ServerError";
import Button from "@/components/common/Button";
import UploadSvg from "@/components/Svg/UploadSvg";
import SvgView from "@/components/Svg/SvgView";
import DetailsSubProperty from "@/components/DetailsSubProperty";
import { useRouter } from "next/navigation";
import ShimmerSubProperty from "@/components/Shimmers/ShimmerSupProperty";
import { Logger } from "@/services/Logger";
import SubPropertyCreateUpdate from "@/components/properties/SubPropertyCreateUpdate";
import { toast } from "react-toastify";
import HasPermission from "@/components/permissions/HasPermission";
import { methods } from "@/app/constants/constants";

const Page = ({ params }) => {
  const { id } = params;
  const [modalSvg, setModalSvg] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [subPropertySelect, setSubPropertySelect] = useState(null);
  const [imageDeletedId, setImageDeletedId] = useState(null);
  const [
    updateProperty,
    {
      data: dataUpdProperty,
      isLoading: isLoadingUpdProp,
      error: errorUpdProperty,
    },
  ] = useUpdatePropertiesMutation({
    fixedCacheKey: "shared-update-post",
  });
  const { data, error, isLoading } = useGetPropertiesByIdQuery(String(id));
  const getSubProperties = useGetSubPropertiesQuery(String(id));
  const [deleteImagesMutation, { error: errorDeleteSvg }] =
    useDeleteImagesMutation();
  const dataSubProperties = getSubProperties.data || [];
  const [arraySubproperty, setArraySubProperty] = useState([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [uploadedSvg, setUploadedSvg] = useState(null);
  const [showSubPropertyForm, setShowSubPropertyForm] = useState(false);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  useEffect(() => {
    if (data && data.imagePlan) {
      setUploadedSvg([data.imagePlan]);
    }

    if (dataSubProperties.length > 0) {
      setArraySubProperty(dataSubProperties);
    }
  }, [data, dataSubProperties]);

  useEffect(() => {
    if (dataUpdProperty) {
      Logger.info("update property was successfully");
      setUploadedSvg([dataUpdProperty.imagePlan]);
      toast.success("SVG cargado exitosamente.");
    }
  }, [dataUpdProperty]);

  useEffect(() => {
    if (errorUpdProperty) {
      Logger.error("Error at update property", errorUpdProperty);
      toast.error("Hubo un error al actualizar la propiedad.");
    }
  }, [errorUpdProperty]);

  useEffect(() => {
    if (imageDeletedId && dataUpdProperty) {
      deleteImagesMutation(imageDeletedId);
    }
  }, [imageDeletedId, dataUpdProperty]);

  useEffect(() => {
    if (errorDeleteSvg) {
      Logger.error("Error at delete svg.");
    }
  }, [errorDeleteSvg]);

  const handleUpdateSubproperty = (newValue) => {
    setArraySubProperty((prevArray) => [...prevArray, newValue]);
  };

  const handlePathSelect = (pathId) => {
    const objetoEncontrado = arraySubproperty.find(
      (objeto) => objeto.svgId === pathId
    );
    setSubPropertySelect(objetoEncontrado);
    setIsPopUpOpen(true);
    setSelectedPath(pathId);
  };

  const toggleModalSvg = () => {
    setModalSvg(!modalSvg);
  };

  const togglePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
    setShowSubPropertyForm(false);
  };

  const handleSvgUploaded = async (imgUploaded) => {
    const newData = { ...data };
    if (newData.imagePlan) {
      const { id: imageId } = newData.imagePlan;
      setImageDeletedId(imageId);
    }
    newData.imagePlan = imgUploaded[0];
    updateProperty({ id: newData.id, updateProperties: newData });
  };
  if (isLoading || getSubProperties.isLoading) {
    return <ShimmerSubProperty />;
  }
  if (error) {
    return <ServerErrorComponent />;
  }
  return (
    <div className=" w-full bg-[#f1f1f1] h-screen ">
      <div className="flex  justify-end ">
        <div
          onClick={handleGoBack}
          className="sm:absolute bg-primary cursor-pointer text-white py-2 px-5 sm:right-0 mx-3 hover:bg-orange-300 z-40  rounded-lg"
        >
          Atras
        </div>
      </div>

      <div className="md:absolute shadow-lg text-sm  sm:bottom-0 mb-2 mx-5 bg-white sm:pr-20 py-4  sm:z-50 sm:justify-end ">
        <h2 className="text-lg uppercase ml-5 font-semibold text-primary mb-2 text-center md:text-left">
          {data.name}
        </h2>
        <div className="flex items-center ml-2 md:ml-4 mb-2 md:mb-0">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#9b59b6 " }}
          ></div>
          Seleccionado
        </div>
        <div className="flex items-center ml-2 md:ml-4 mb-2 md:mb-0">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#4ac581" }}
          ></div>
          Disponible
        </div>
        <div className="flex items-center ml-2 md:ml-4 mb-2 md:mb-0">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#e74c3c " }}
          ></div>
          Vendido
        </div>
        <div className="flex items-center ml-2 md:ml-4 mb-2 md:mb-0">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#f1c40f " }}
          ></div>
          Reservada
        </div>
        <div className="flex items-center ml-2 md:ml-4">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#cccccc" }}
          ></div>
          No disponible
        </div>
        <div className="flex items-center ml-2 md:ml-4">
          <div
            className="w-3 h-3 md:w-4 md:h-4 mr-2 rounded"
            style={{ backgroundColor: "#3498db " }}
          ></div>
          Area común
        </div>
      </div>
      <SvgView
        svg={uploadedSvg}
        onPathSelect={handlePathSelect}
        arraySubProperties={arraySubproperty}
        ModalSvg={toggleModalSvg}
      />

      {arraySubproperty.length === 0 && uploadedSvg === null ? (
        <HasPermission to={methods.update}>
          <Button
            type="Button"
            className="text-xs absolute mt-[-7px]"
            onClick={() => toggleModalSvg()}
          >
            Subir Svg
          </Button>
        </HasPermission>
      ) : null}
      {modalSvg ? (
        <UploadSvg
          detailsData={data}
          SvgUploaded={handleSvgUploaded}
          SvgSave={uploadedSvg}
          ModalSvg={toggleModalSvg}
        />
      ) : null}
      <div className="sm:bottom-0 sm:right-0 shadow-lg  sm:absolute sm:m-2 sm:z-30">
        {isPopUpOpen && selectedPath ? (
          showSubPropertyForm ? (
            <SubPropertyCreateUpdate
              onClose={togglePopUp}
              newSubproperty={handleUpdateSubproperty}
              idSvg={selectedPath}
              data={subPropertySelect}
              idProperty={data.id}
            ></SubPropertyCreateUpdate>
          ) : subPropertySelect ? (
            <DetailsSubProperty
              dataSubproperty={subPropertySelect}
              id={id}
              toggleFormSubProperty={() => setShowSubPropertyForm(true)}
              onClose={togglePopUp}
            />
          ) : (
            <SubPropertyCreateUpdate
              onClose={togglePopUp}
              newSubproperty={handleUpdateSubproperty}
              idSvg={selectedPath}
              data={subPropertySelect}
              idProperty={data.id}
            ></SubPropertyCreateUpdate>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Page;
