import React from 'react';
import { Formik, Form } from 'formik';
import { FormInputLabel } from '../common/FormInputLabel';
import { validationSubPropertySchema } from '@/app/utils/validations/schemaValidation';
import { subPropertiesScheme } from '@/app/utils/schema/propertySchema';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateSubPropertiesMutation } from '@/redux/services/propertiesApi';
import Button from './Button';
const SubPropertyForm = ({idSvg,newSubproperty,idProperty,onClose,subPropertySave}) => {
    const [createSubProperties] = useCreateSubPropertiesMutation();
    
    const handleSubmit = async(values,{ resetForm }) => {
        const updatedValues = { ...values };
        updatedValues.svgId = idSvg
        await handleCreateSubProperties(updatedValues,{ resetForm })

    };
    const handleCreateSubProperties = async (newSubPropertiesData,{ resetForm }) => {
      try {
        const response = await createSubProperties({
          id: idProperty,
          newSubProperties: newSubPropertiesData,
        });
        const c=response.data.subProperties.length
        const dataNew=response.data.subProperties[c-1] 
        const dataNewCopy = { ...dataNew }; // Clonar el objeto
        dataNewCopy.isAvailable = true;

        newSubproperty(dataNewCopy);

        onClose()
        toast.success("Se registro la nueva propiedad")        
      
      resetForm();

  
      } catch (error) {
        Logger.error(error);
      }
    };
  return (
      <div className="w-96 bg-white rounded-lg shadow-2xl  p-6">
      <Formik
      enableReinitialize={true}
        initialValues={subPropertySave|| subPropertiesScheme}
        validationSchema={validationSubPropertySchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }) => (
          <Form>
            {
              subPropertySave?
              null:
              <div className='mb-10'>
              <label className='text-xl font-bold'>Registro de propiedad</label>  
            </div>
            }

            <FormInputLabel
              label="CODIGO"
              name="code"
              placeholder="Ej. L-2323"
              autoComplete="code"
              value={values.code}

            />
            <FormInputLabel
              label="TAMAÑO"
              name="size"
              type="number"
              placeholder="Ej. 100m2"
              autoComplete="size"
              value={values.size}

            />
            <FormInputLabel
              label="PRECIO"
              name="price"
              type="number"
              placeholder="Ej. 100000$"
              autoComplete="price"
              value={values.price}

            />


            <div className="flex mt-10 justify-between">
              <Button
                type="submit"
                label="Registrar"
                className="w-full"
              >
              </Button>
                <Button 
                  type="button" 
                  onClick={onClose} 
                  label="Cancelar" 
                  className="w-full ml-2"
                ></Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>

  );
};

export default SubPropertyForm;
