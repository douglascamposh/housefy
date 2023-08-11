import React, { useState } from 'react'; 

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/navigation'
import { useCreatePropertiesMutation } from '@/redux/services/propertiesApi';

import MapComponent from '../Maps/MapComponent';
import Button from './Button';

import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  { id: '1', name: 'Urbanizaciones' },
  { id: '2', name: 'Departamentos' },
];
const departments = [
  'Pando', 'Beni', 'Cochabamba', 'La Paz', 'Oruro', 'Potosí', 'Santa Cruz', 'Tarija','Sucre'
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio')
  .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s,.!?:;-]*$/, 'El nombre contiene caracteres no permitidos')
  .min(2, 'El nombre debe tener al menos 2 caracteres')
  .max(50, 'El nombre no debe exceder los 50 caracteres'),
  description: Yup.string()
  .required('La descripción es obligatoria')
  .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s,.!?:;-]*$/, 'La descripción contiene caracteres no permitidos')
  .max(200, 'La descripción no debe exceder los 200 caracteres'),
  address: Yup.object().shape({
    street: Yup.string().required('La calle es obligatoria'),
    reference: Yup.string()
    .max(100, 'La referencia no debe exceder los 100 caracteres'),
    streetNumber: Yup.string(),
    state: Yup.string()
    .required('El departamento es obligatorio'),
    city: Yup.string()
    .required('El nombre de la ciudad es obligatorio')
    .matches(/^[a-zA-Z\s]*$/, 'No se permiten caracteres especiales en el nombre de la ciudad'),
  }),
  category: Yup.string()
  .required('La categoría es obligatoria'),
  totalProperties: Yup.number()
  .required('La cantidad de propiedades es obligatoria')
  .integer('Debe ser un número entero mayor que cero')
  .min(1, 'Debe ser mayor que cero'),
  propertiesAvailable: Yup.number()
  .required('La cantidad disponible es obligatoria')
  .integer('Debe ser un número entero').test(
    'properties-available',
    'Las propiedades disponibles no deben ser mayores que el total de propiedades',
    function (value) {
      return value <= this.parent.totalProperties;
    }
  ),
  latitude: Yup.number(),
  longitude: Yup.number()
});
const CreateForm = () => {
  const router = useRouter()
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [createProperty, { isLoading }] = useCreatePropertiesMutation();


  const handleSubmit = async (values) => {
    values.address.latitude = coordinates.latitude;
    values.address.longitude = coordinates.longitude;    
    if (coordinates.longitude!=0 ) {
      try {
        const result = await createProperty(values);
        router.push('/properties')

      } catch (error) {
        toast.error('Hubo un error al crear la propiedad.')
      }
    }else{
      toast.error('Seleccione una ubicación en el mapa')

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
        initialValues={{
          name: '',
          description: '',
          address: {
            street: '',
            reference: '',
            streetNumber: '',
            city: '',
            country:'Bolivia',
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            state: '',
          },
          images:[],
          category: '',
          totalProperties: 0,
          propertiesAvailable: 0,

        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="mt-8 space-y-6">

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <Field
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nombre"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors?.name && touched?.name ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm`}
                />
              </div>
              <ErrorMessage name="name" component="div" className="text-red-500" />

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripcion
                </label>
                <Field
                  name="description"
                  type="text"
                  autoComplete="description"
                  placeholder="Descripcion"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors?.description && touched?.description ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm`}
                />
              <ErrorMessage name="description" component="div" className="text-red-500" />

              </div>
              <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  Departamento
                </label>
                <Field
                  as="select"
                  name="address.state"
                  className={`block w-full py-2 px-3 border ${
                    errors.address?.state && touched.address?.state ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300 sm:text-sm`}
                >
                  <option value="" label="Selecciona un departamento" />
                  {departments.map(department => (
                  <option key={department} value={department} label={department} />
                  ))}
                </Field>
                <ErrorMessage name="address.state" component="div" className="text-red-500" />
              </div>

                  <div className="w-1/2">
                    <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                      Nombre de Ciudad
                    </label>
                    <Field
                      name="address.city"
                      type="text"
                      autoComplete="address.city"
                      placeholder="Ej: El Alto"
                      className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                        errors.address?.city && touched.address?.city
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm`}
                    />
                    <ErrorMessage name="address.city" component="div" className="text-red-500" />
                  </div>
                </div>
              <div>
                <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
                  Calle
                </label>
                <Field
                  name="address.street"
                  type="text"
                  autoComplete="address.street"
                  placeholder="Ej: Av. Principal"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.address?.street && touched.address?.street ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm`}
                />
              </div>
              <ErrorMessage name="address.street" component="div" className="text-red-500" />

              <div>
                <label htmlFor="address.reference" className="block text-sm font-medium text-gray-700">
                  Referencia
                </label>
                <Field
                  name="address.reference"
                  type="text"
                  autoComplete="address.reference"
                  placeholder="Ej: Frente al parque central"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.address?.reference && touched.address?.reference ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm`}
                />
              </div>
              <ErrorMessage name="address.reference" component="div" className="text-red-500" />
              <div>
                <label htmlFor="address.streetNumber" className="block text-sm font-medium text-gray-700">
                  Número de Calle
                </label>
                <Field
                  name="address.streetNumber"
                  type="text"
                  autoComplete="address.streetNumber"
                  placeholder="Ej: 123"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.address?.streetNumber && touched.address?.streetNumber
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm`}
                />
              </div>
              <ErrorMessage name="address.streetNumber" component="div" className="text-red-500" />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <Field
                  as="select"
                  name="category"
                  className={`block w-full py-2 px-3 border ${
                    errors.category && touched.category ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300 sm:text-sm`}
                >
                  <option value="" label="Selecciona una categoría" />
                  {categories.map(category => (
                    <option key={category.id} value={category.id} label={category.name} />
                  ))}
                </Field>
              </div>
              <ErrorMessage name="category" component="div" className="text-red-500" />
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="totalProperties" className="block text-sm font-medium text-gray-700">
                    Total de Propiedades
                  </label>
                  <Field
                    name="totalProperties"
                    type="number"
                    placeholder="Total de Propiedades"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.totalProperties && touched.totalProperties ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm`}
                  />
                  <ErrorMessage name="totalProperties" component="div" className="text-red-500" />

                </div>
                <div className="w-1/2">
                  <label htmlFor="propertiesAvailable" className="block text-sm font-medium text-gray-700">
                    Propiedades Disponibles
                  </label>
                  <Field
                    name="propertiesAvailable"
                    type="number"
                    placeholder="Propiedades Disponibles"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.propertiesAvailable && touched.propertiesAvailable
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-300 focus:border-blue-300 focus:z-10 sm:text-sm`}
                  />
                  <ErrorMessage name="propertiesAvailable" component="div" className="text-red-500" />

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
              <MapComponent onMarkerPositionChange={handleMarkerPositionChange} ></MapComponent>    
            </div>
            </div>
            <div>
            <Button
                label="Registrar propiedad"
                type="submit"
                className="w-full"
                disabled={isLoading}
            />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateForm;