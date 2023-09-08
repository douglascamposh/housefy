import React, { useState } from 'react'; 

import { Formik, Form } from 'formik';

import { useRouter } from 'next/navigation'
import { useCreatePropertiesMutation,useUpdatePropertiesMutation } from '@/redux/services/propertiesApi';
import MapComponent from '../Maps/MapComponent';
import Button from './Button';
import { validationPropertySchema } from '@/app/constants/SchemaValidation';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormInputLabel } from '../common/FormInputLabel';
import { categories,propertyScheme,departments } from '@/app/constants/data';
import UploadImages from '../UploadImages';
import ImageGallery from '../ImageGallery';



const PropertyForm = ({action,data}) => {
  const router = useRouter()
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [createProperty, { isLoading }] = useCreatePropertiesMutation();
  const [updateProperty, { isLoading2 }] = useUpdatePropertiesMutation({
    fixedCacheKey: 'shared-update-post',
  });
  const [uploadedImages, setUploadedImages] = useState(data ? data.images : []);
  const [modalImages,setModalImages]=useState(false);

  if (data){

    data = {
      ...data,
      category: data.type
    };
    delete data.type;
  }else{
    data={...propertyScheme}

  }

  const toggleModal=(status)=>{

    setModalImages(status)
  }
  const handleImagesUploaded = (uploaded) => {
      setUploadedImages((prevUploaded) => [ ...uploaded]);
  }
  const handleNavigation = () => {
    router.push('/properties');
  };

  const registerProperty=async(payload)=>{


    try {
      await createProperty(payload);
      handleNavigation();
    } catch (error) {
      toast.error('Hubo un error al crear la propiedad.')
    }
  }
  const updateProperties=async(payload)=>{

    try {
      await updateProperty({
        id:payload.id,
        updateProperties:payload
      });
      handleNavigation();
    } catch (error) {
      toast.error('Hubo un error al actualizar la propiedad.')
    }
  }

  const handleSubmit = (values) => {
    const newValues = { ...values };
    newValues.images=uploadedImages

    if (newValues.images!=0){
      if (coordinates.latitude!=0){
            newValues.address = {
        ...newValues.address, 
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      };
      }
      if (newValues.address.latitude !== 0) {
        const payload = {
          ...newValues,
          type: newValues.category,
        };
  
        delete payload.category;
  
        if (action === 'register') {
          registerProperty(payload);
        } else if (action === 'update') {
          updateProperties(payload);
        }
      } else {
        toast.error('Seleccione una ubicación en el mapa');
      }
    }else{
      toast.error('Seleccione al menos una imagen');
    }


  };
  const handleMarkerPositionChange = (clickedLatLng) => {
    setCoordinates({ latitude: clickedLatLng.lat, longitude: clickedLatLng.lng });
  };
  return (
    
    <div>
      <ToastContainer
        transition={Flip}
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      {isLoading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="spinner border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin" />
      </div>
          )}
      <Formik
        initialValues={data}
        validationSchema={validationPropertySchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched,values }) => (
          <Form className="mt-8 space-y-6">

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                {uploadedImages.length!=0?
                <div>

                  <ImageGallery images={uploadedImages} toggleModal={toggleModal}></ImageGallery>

                </div>
                :
                <div className='text-center'>
                  <h2 className='mb-2'>Ninguna imagenen seleccionada</h2>
                <Button  type="button" label='Selecciona imagenes' onClick={()=>toggleModal(true)}></Button>

                </div>
              }
                  {modalImages ?
                  <UploadImages ImagesUploaded={handleImagesUploaded} ImagesSave={uploadedImages} ModalImages={toggleModal}></UploadImages>
                  
                  :null

                }


                <FormInputLabel
                    label="Nombre"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nombre"
                    touched={touched}
                    errors={errors}
                    value={values.name}
                />
                <FormInputLabel
                    label="Descripcion"
                    name="description"
                    type="text"
                    placeholder="Descripcion"
                    touched={touched}
                    errors={errors}
                    value={values.description}

                />
                
                <FormInputLabel
                  label="Categoria"
                  as="select"
                  name="category"
                  touched={touched}
                  errors={errors}
                  value={values.category}
                >
                    <option value="" label="Selecciona una categoría" />
                  {categories.map(type => (
                    <option key={type.id} value={type.id} label={type.name} />
                  ))}
                </FormInputLabel>
              
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div>
                
              <div className="flex space-x-4">
              <div className="w-1/2">
                <FormInputLabel
                  label="Departamento"
                  as="select"
                  name="address.state"
                  placeholder="Departamento"
                  touched={touched}
                  errors={errors}
                  value={values.address.state}
                >
                  <option value="" label="Selecciona un departamento" />
                    {departments.map(department => (
                  <option key={department} value={department} label={department} />
                  ))}
                </FormInputLabel>

              </div>
                  <div className="w-1/2">

                    <FormInputLabel
                      label="Ciudad"
                      name="address.city"
                      type="text"
                      autoComplete="address.city"
                      placeholder="Ej: El Alto"
                      touched={touched}
                      errors={errors}
                      value={values.address.city}
                    >
                    </FormInputLabel>

                  </div>
                </div>
              <div>
                <FormInputLabel
                  label="Calle"
                  name="address.street"
                  type="text"
                  autoComplete="address.street"
                  placeholder="Ej: Av. Principal"
                  touched={touched}
                  errors={errors}
                  value={values.address.street}
                >

                </FormInputLabel>

              </div>
              <div>
                <FormInputLabel
                  label="Referencia"
                  name="address.reference"
                  type="text"
                  autoComplete="address.reference"
                  placeholder="Ej: Frente al parque central"
                  value={values.address.reference}
                >

                </FormInputLabel>
               
              </div>
              <div>
                <FormInputLabel
                    label="Nro De Calle"
                    name="address.streetNumber"
                  type="text"
                  autoComplete="address.streetNumber"
                  placeholder="Ej: 123"
                  value={values.address.streetNumber}

                >

                </FormInputLabel>
             
              </div>

              </div>
              

              <div>
                {coordinates.latitude !== 0 && coordinates.longitude !== 0 ? (
                  <p>
                  </p>
                ) : (
                  <p>Seleccione la ubicación en el mapa</p>
                )}
              </div>
              {action=="register"?
              <MapComponent onMarkerPositionChange={handleMarkerPositionChange} lat={values.address.latitude} lng={values.address.longitude} zoom={5} marker={true}></MapComponent>    

                      :  
                      <MapComponent onMarkerPositionChange={handleMarkerPositionChange}  lat={values.address.latitude} lng={values.address.longitude} zoom={17} marker={true}></MapComponent>    

              }
            </div>
            </div>
            <div>
              {action=="register"?
                            <Button
                            label="Registrar propiedad"
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        />:
                    <div className='flex'> 
                        <Button
                        label="Actualizar Propiedad"
                        type="submit"
                        className="w-full m-2"
                        disabled={isLoading}
                        />
                        <Button
                        label="Cancelar"
                        className="w-full m-2"
                        onClick={handleNavigation}
                        disabled={isLoading}
                        />
                    </div>
              }

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PropertyForm;