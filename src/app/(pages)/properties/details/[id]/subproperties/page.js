"use client"
import React, { useState, useEffect } from 'react';
import {
  useGetPropertiesByIdQuery,
  useGetSubPropertiesQuery,
  useUpdatePropertiesMutation,
} from '@/redux/services/propertiesApi';
import ServerErrorComponent from '@/components/ServerError';
import Button from '@/components/Form/Button';
import UploadSvg from '@/components/Svg/UploadSvg';
import SvgView from '@/components/Svg/SvgView';
import SubPropertyForm from '@/components/Form/SubPropertyForm';
import DetailsSubProperty from '@/components/DetailsSubProperty';
import {
  MdHome,
  MdRemoveShoppingCart,
  MdCheckCircle,
  MdAttachMoney,
} from 'react-icons/md';
import NoDataMessage from '@/components/NoDataMsg';
import ShimmerSubProperty from '@/components/Shimmers/ShimmerSupProperty';
import { Logger } from '@/services/Logger';

const Page = ({ params }) => {
  const { id } = params;
  const [modalSvg, setModalSvg] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [subPropertySelect, setSubPropertySelect] = useState(null);

  const [updateProperty, { isLoading: isLoading2 }] = useUpdatePropertiesMutation({
    fixedCacheKey: 'shared-update-post',
  });

  const { data, error, isLoading } = useGetPropertiesByIdQuery(String(id));
  const getSubProperties = useGetSubPropertiesQuery(String(id));
  const dataSubProperties = getSubProperties.data || [];

  const [arraySubproperty, setArraySubProperty] = useState([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [uploadedSvg, setUploadedSvg] = useState(null);

  useEffect(() => {
    if (data && data.imagePlan) {
      setUploadedSvg([data.imagePlan]);
    }

    if (dataSubProperties.length > 0) {
      setArraySubProperty(dataSubProperties);
    }
  }, [data, dataSubProperties]);

  const handleUpdateSubproperty = (newValue) => {
    setArraySubProperty((prevArray) => [...prevArray, newValue]);
  };

  const handlePathSelect = (pathId) => {
    const objetoEncontrado = arraySubproperty.find((objeto) => objeto.svgId === pathId);
    setSubPropertySelect(objetoEncontrado);
    setIsPopUpOpen(true);
    setSelectedPath(pathId);
  };

  const toggleModalSvg = (status) => {
    setModalSvg(status);
  };

  const togglePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  const handleSvgUploaded = async (uploaded) => {
    const newData = { ...data };
    newData.imagePlan = uploaded[0];
    await updateProperties(newData);
    setUploadedSvg([...uploaded]);
  };

  const updateProperties = async (payload) => {
    try {
      await updateProperty({
        id: payload.id,
        updateProperties: payload,
      });
    } catch (error) {
      Logger.error(error);
    }
  };

  if (isLoading || getSubProperties.isLoading) {
    return <ShimmerSubProperty />;
  }

  if (error) {
    return <ServerErrorComponent />;
  }

  return (
    <div className="container mx-auto px-4 md:px-0">
      <h2 className="text-3xl mb-2 text-center md:text-left">{data.name}</h2>
      {arraySubproperty.length === 0 && uploadedSvg === null ? (
        <div>
          <Button type="Button" label="Subir svg" onClick={() => toggleModalSvg(true)} />
          <NoDataMessage message="No existe un plano disponible en este momento..." />
        </div>
      ) : null}
      {modalSvg ? (
        <UploadSvg detailsData={data} SvgUploaded={handleSvgUploaded} SvgSave={uploadedSvg} ModalSvg={toggleModalSvg} />
      ) : null}
      <div className="flex flex-col md:flex-row">
        {uploadedSvg ? (
          <>
            <SvgView svg={uploadedSvg} onPathSelect={handlePathSelect} arraySubProperties={arraySubproperty} className="md:w-1/2" />
            <div className="flex justify-center md:w-1/2 md:flex-col">
              {isPopUpOpen && selectedPath ? (
                subPropertySelect ? (
                  <DetailsSubProperty dataSubproperty={subPropertySelect} id={id} />
                ) : (
                  <SubPropertyForm idSvg={selectedPath} onClose={togglePopUp} newSubproperty={handleUpdateSubproperty} subPropertySave={subPropertySelect} idProperty={data.id} />
                )
              ) : (
                <div>
                  <div className="flex">
                    <div className="border-r-2 border-black p-4 md:flex md:items-center text-center">
                      <div className="mr-4 flex justify-center">
                        <MdHome size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-xs md:text-sm md:mt-0 mt-1">Total propiedades</p>
                        <p className="text-gray-600">{arraySubproperty.length}</p>
                      </div>
                    </div>
                    <div className="border-r-2 border-black p-4 md:flex md:items-center text-center">
                      <div className="mr-4 flex justify-center">
                        <MdRemoveShoppingCart size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-xs md:text-sm md:mt-0 mt-1">Propiedades vendidas</p>
                        <p className="text-gray-600">
                          {arraySubproperty.filter((obj) => obj.isAvailable !== true).length}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 md:flex md:items-center text-center">
                      <div className="mr-4 flex justify-center">
                        <MdCheckCircle size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-xs md:text-sm md:mt-0 mt-1">Propiedades disponibles</p>
                        <p className="text-gray-600 ">
                          {arraySubproperty.filter((obj) => obj.isAvailable === true).length}
                        </p>
                      </div>
                    </div>
                  </div>
                  {arraySubproperty.length > 0 ? (
                    <div className="p-4 flex items-center">
                      <div className="mr-4">
                        <MdAttachMoney size={32} />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">
                          <label>Desde: $ </label>
                          {Math.min.apply(
                            Math,
                            arraySubproperty.map(function (obj) {
                              return obj.price;
                            })
                          )}
                        </p>
                        <p className="font-semibold text-lg">
                          <label>Hasta: $ </label>
                          {Math.max.apply(
                            Math,
                            arraySubproperty.map(function (obj) {
                              return obj.price;
                            })
                          )}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Page;