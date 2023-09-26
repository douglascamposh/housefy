import { Formik, Form, FieldArray } from 'formik';
import { FormInputLabel } from '../common/FormInputLabel';
import Button from "./Button"
import { subPropertySaleScheme } from '@/app/utils/schema/propertySchema';
import { validationSubPropertySaleScheme } from '@/app/utils/validations/schemaValidation';
import { useCreateSalePropertyMutation } from '@/redux/services/propertiesApi';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cities } from '@/app/constants/constants';
import { Logger } from '@/services/Logger';

const FormSale = (params)=>{

    const [createSale, { isLoading }, errorSale] = useCreateSalePropertyMutation();
    const handleSubmit = async(values, {resetForm}) => {
      const modifiedValues = { ...values };
      modifiedValues.propertyId = params.idProperty;
      modifiedValues.subPropertyId = params.idSubProperty;
      modifiedValues.customer.state = modifiedValues.customer.city;
      modifiedValues.customer.country = 'Bolivia'; //Todo: we should improve it getting country from the city Object
      await handleCreateSales(modifiedValues,{resetForm})
    }
    const handleCreateSales= async (newSaleProperty,{resetForm}) => {
      try {
        const response = await createSale( newSaleProperty );
        if (response.data) {
          resetForm();
          toast.success("Se vendio esta propiedad");
          params.onClose();
        } else {
          toast.error("No se puedo realizar la venta de la propiedad");
        }
      } catch (error) {
        Logger.error('An error ocurred at create sale: ', error);
      }
    };

    return (
      <div>
        <Formik
          initialValues={subPropertySaleScheme}
          validationSchema={validationSubPropertySaleScheme(params.price)}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, values }) => (
          <Form>
            <label className='font-bold'>Datos de cliente:</label>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormInputLabel
                    label="Nombres"
                    name="customer.name"
                    placeholder="Ej. Gustavo"
                    autoComplete="name"
                    value={values.customer.name}
                    touched={touched}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormInputLabel
                    label="Apellidos"
                    name="customer.lastName"
                    placeholder="Ej. Lara"
                    autoComplete="lastName"
                    value={values.customer.lastName}
                    touched={touched}
                    errors={errors}
                  />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormInputLabel
                  label="Carnet de identidad"
                  name="customer.ci"
                  placeholder="Ej. 123456 CB"
                  value={values.customer.ci}
                  touched={touched}
                  errors={errors}
                />
              </div>
              <div>
                <FormInputLabel
                  label="Número de telefono"
                  name="customer.phoneNumber"
                  placeholder="Ej. XXXXXXXX"
                  autoComplete="phoneNumber"
                  value={values.customer.phoneNumber}
                  touched={touched}
                  errors={errors}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormInputLabel
                  label="Direccion"
                  name="customer.street"
                  placeholder="Ej. Av. Circunvalacion "
                  autoComplete="street"
                  value={values.customer.street}
                  touched={touched}
                  errors={errors}
                />
              </div>
              <div>
                <FormInputLabel
                  label="Numero de casa"
                  name="customer.streetNumber"
                  placeholder="Ej. #123 o s/n"
                  autoComplete="streetNumber"
                  value={values.customer.streetNumber}
                  touched={touched}
                  errors={errors}
                />
              </div>
            </div>
            <FormInputLabel
              label="Referencia del Lugar"
              name="customer.reference"
              placeholder="Ej. Entre calle Bolivia y Peru"
              autoComplete="reference"
              value={values.customer.reference}
              touched={touched}
              errors={errors}
            />
            <FormInputLabel
              label="Ciudad"
              as="select"
              name="customer.city"
              touched={touched}
              errors={errors}
              value={values.customer.city}
            >
              <option value="" label="Ciudad de resisdencia" />
                  {cities.map(city => (
              <option key={city} value={city} label={city} />
              ))}
            </FormInputLabel>
            <label className='font-bold'>Datos de pago:</label>

            <FormInputLabel
              label="Anticipo:"
              name="onAccount"
              placeholder="Ej. 100"
              type="number"
              autoComplete="onAccount"
              value={values.onAccount}
            />
            <div className="flex justify-between">
              <p className="text-gray-700">Saldo: </p>
              <p>{params.price-values.onAccount}</p>
              <p className="text-gray-700">Total: </p>
              <p>{params.price}</p>
            </div>
            <FieldArray
              name="references"
              render={(arrayHelpers) => {
                const references = values.references;
                return (
                  <div>
                    {references && references.length > 0
                      ? references.map((reference, index) => (
                          <div key={index}>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <FormInputLabel
                                  label="Datos referido"
                                  name={`references.${index}.name`}
                                  placeholder="Nombres"
                                  value={reference.name}
                                  touched={touched}
                                  errors={errors}
                                />
                              </div>
                              <div>
                                <FormInputLabel
                                  label="&#160;"
                                  name={`references.${index}.lastName`}
                                  placeholder="Apellidos"
                                  value={reference.lastName}
                                  touched={touched}
                                  errors={errors}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <FormInputLabel
                                  label="telf. referido"
                                  name={`references.${index}.phoneNumber`}
                                  placeholder="Agregar telefono"
                                  autoComplete="street"
                                  value={reference.phoneNumber}
                                  touched={touched}
                                  errors={errors}
                                />
                              </div>
                              <div>
                                <FormInputLabel
                                  label="Grado de parentesco"
                                  name={`references.${index}.relationship`}
                                  placeholder="Ej. Padre"
                                  autoComplete="relationship"
                                  value={references.relationship}
                                  touched={touched}
                                  errors={errors}
                                />
                              </div>
                            </div>
                            <Button
                              type="button"
                              label={'Remover Referido'}
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            />
                          </div>
                        ))
                      : null}
                    <Button
                      type="button"
                      label={'Agregar Referidos'}
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          lastName: "",
                          phoneNumber: "",
                          relationship: "",
                        })
                      } // insert an empty string at a position
                    />
                  </div>
                );
              }}
            />
            <div className="mt-6">
              <Button
                type="submit"
                label="Vender"
                className="w-full"
              >
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    )
}
export default FormSale