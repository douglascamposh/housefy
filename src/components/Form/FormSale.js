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
import { sale_status } from '@/app/constants/constants';

const FormSale = (params)=>{
    const [createSale, { isLoading }, errorSale] = useCreateSalePropertyMutation();
    const newSubPropertySale={...subPropertySaleScheme}
    let customerSave=params.selectedCustomer;
    if (customerSave!=null){
      if (!customerSave.address){
        const newcustomer={...customerSave}
        newcustomer.address=  {
          street: "",
          reference: "",
          streetNumber: "",
          city: "",
          country: "",
          state: ""
        };
        customerSave={...newcustomer}
      }
      newSubPropertySale.customer=customerSave;

    }
    const handleSubmit = async(values, {resetForm}) => {
      const modifiedValues = { ...values };
      modifiedValues.propertyId = params.idProperty;
      modifiedValues.subPropertyId = params.idSubProperty;
      modifiedValues.status=sale_status.sold;
      if (!customerSave){
        modifiedValues.customer.address = {
          ...modifiedValues.customer.address,
          state: modifiedValues.customer.address.city,
          country: 'Bolivia'
        };
      }
      await handleCreateSales(modifiedValues,{resetForm});
    }
    const handleCreateSales= async (newSaleProperty,{resetForm}) => {
      try {
        const response = await createSale( newSaleProperty );
        if (response.data) {
          resetForm();
          toast.success("Propiedad vendida exitosamente");
          params.onClose();
        } else {
          Logger.error('An error ocurred at create sale: ', response.error);
          toast.error("No se puedo realizar la venta de la propiedad");
        }
      } catch (error) {
        Logger.error('An error ocurred at create sale: ', error);
      }
    };

    return (
      <div>
        <Formik
          initialValues={newSubPropertySale}
          enableReinitialize={true}
          validationSchema={validationSubPropertySaleScheme(params.price)}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, values }) => (
          <Form>
            <label className='font-bold'>Datos de cliente:</label>
            {
              customerSave?
                <div className="bg-white shadow-md rounded p-4">
                    <p><strong>Nombres:</strong> {customerSave.name} {customerSave.lastName}</p>
                    <p><strong>Teléfono:</strong> {customerSave.phoneNumber}</p>
                    <p><strong>Cédula de Identidad:</strong> {customerSave.ci} {customerSave.extensionCi}</p>
                    {customerSave.address &&
                        <p><strong>Dirección:</strong> {customerSave.address.street} {customerSave.address.streetNumber && "#"+customerSave.address.streetNumber+"," } {customerSave.address.reference && customerSave.address.reference+","} {customerSave.address.city && customerSave.address.city+","} {customerSave.address.state && customerSave.address.state+","} {customerSave.address.country }</p>
                    }
                </div>

              :
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormInputLabel
                      label="Nombres *"
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
                      label="Apellidos *"
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
                    label="Carnet de identidad *"
                    name="customer.ci"
                    placeholder="Ej. 123456 CB"
                    value={values.customer.ci}
                    touched={touched}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormInputLabel
                    label="Número de telefono *"
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
                    label="Dirección *"
                    name="customer.address.street"
                    placeholder="Ej. Av. Circunvalacion "
                    autoComplete="street"
                    value={values.customer.address.street}
                    touched={touched}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormInputLabel
                    label="Número de casa *"
                    name="customer.address.streetNumber"
                    placeholder="Ej. #123 o s/n"
                    autoComplete="streetNumber"
                    value={values.customer.address.streetNumber}
                    touched={touched}
                    errors={errors}
                  />
                </div>
                </div>
                <FormInputLabel
                  label="Referencia del Lugar *"
                  name="customer.address.reference"
                  placeholder="Ej. Entre calle Bolivia y Peru"
                  autoComplete="reference"
                  value={values.customer.address.reference}
                  touched={touched}
                  errors={errors}
                />
                <FormInputLabel
                  label="Ciudad *"
                  as="select"
                  name="customer.address.city"
                  touched={touched}
                  errors={errors}
                  value={values.customer.address.city}
                >
                  <option value="" label="Ciudad de residencia" />
                      {cities.map(city => (
                  <option key={city} value={city} label={city} />
                  ))}
                </FormInputLabel>
              </>
            }
            <label className='font-bold'>Datos de pago:</label>

            <FormInputLabel
              label="Anticipo $"
              name="onAccount"
              placeholder="Ej. 0"
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
              name="customer.references"
              render={(arrayHelpers) => {
                const references = values.customer.references;
                return (
                  <div>
                    <label className='font-bold'>Datos de referidos:</label>
                    {references && references.length > 0
                      ? references.map((reference, index) => (
                          <div key={index}>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <FormInputLabel
                                  label="Nombre *"
                                  name={`customer.references.${index}.name`}
                                  placeholder="Nombres"
                                  value={reference.name}
                                  touched={touched}
                                  errors={errors}
                                />
                              </div>
                              <div>
                                <FormInputLabel
                                  label="Apellido *"
                                  name={`customer.references.${index}.lastName`}
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
                                  label="Telf. referido *"
                                  name={`customer.references.${index}.phoneNumber`}
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
                                  name={`customer.references.${index}.relationship`}
                                  placeholder="Ej. Padre"
                                  autoComplete="relationship"
                                  value={reference.relationship}
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
                      } 
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