
import AutoCompleteCustomer from "../AutoCompleteCustomer";
import { useState } from "react";
import Button from "./Button";
import { FormInputLabel } from "../common/FormInputLabel";
import { Formik, Form, FieldArray } from 'formik';
import { validationCustomer } from '@/app/utils/validations/schemaValidation';
import { cities } from "@/app/constants/constants";
import { customerScheme } from "@/app/utils/schema/propertySchema";
import { useDispatch,useSelector } from "react-redux";
import { setData } from "@/redux/actions";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteOutline } from "react-icons/md";
const CustomerForm=({ modifiedPage })=>{
    const dispatch = useDispatch();
    let Data = useSelector((state) => state.rootReducer.Data);
    const [selectedCustomer, setSelectedCustomer] = useState(Data.customer);
    const newSubPropertySale={...customerScheme}
    const handleSelectCustomer = (value) => {
      setSelectedCustomer(value);
    };
    const handleSubmit = (values) => {
      if (values.references.length==0){
        toast.error("Agrega al menos un referido");
      }else{
        let dataCopy={...Data}
        dataCopy.customer=values;
        dispatch(setData(dataCopy));
        modifiedPage(1);
      }
      };
    return (
        <div className="text-black">
          <AutoCompleteCustomer onSelect={handleSelectCustomer} />
          <Formik
            initialValues={selectedCustomer ? selectedCustomer :newSubPropertySale}
            enableReinitialize={true}
            validationSchema={validationCustomer}
            onSubmit={handleSubmit}
          >
          {({ errors, touched, values }) => (
            <Form>
              {
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormInputLabel
                        label="Nombres *"
                        name="name"
                        placeholder="Ej. Gustavo"
                        autoComplete="name"
                        value={values.name}
                        touched={touched}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <FormInputLabel
                        label="Apellidos *"
                        name="lastName"
                        placeholder="Ej. Lara"
                        autoComplete="lastName"
                        value={values.lastName}
                        touched={touched}
                        errors={errors}
                      />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormInputLabel
                      label="Carnet de identidad *"
                      name="ci"
                      placeholder="Ej. 123456 CB"
                      value={values.ci}
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                  <div>
                    <FormInputLabel
                      label="Número de telefono *"
                      name="phoneNumber"
                      placeholder="Ej. XXXXXXXX"
                      autoComplete="phoneNumber"
                      value={values.phoneNumber}
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormInputLabel
                      label="Dirección *"
                      name="address.street"
                      placeholder="Ej. Av. Circunvalacion "
                      autoComplete="street"
                      value={values.address.street}
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                  <div>
                    <FormInputLabel
                      label="Número de casa *"
                      name="address.streetNumber"
                      placeholder="Ej. #123 o s/n"
                      autoComplete="streetNumber"
                      value={values.address.streetNumber}
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                  </div>
                  <FormInputLabel
                    label="Referencia del Lugar *"
                    name="address.reference"
                    placeholder="Ej. Entre calle Bolivia y Peru"
                    autoComplete="reference"
                    value={values.address.reference}
                    touched={touched}
                    errors={errors}
                  />
                  <FormInputLabel
                    label="Ciudad *"
                    as="select"
                    name="address.city"
                    touched={touched}
                    errors={errors}
                    value={values.address.city}
                  >
                    <option value="" label="Ciudad de residencia" />
                        {cities.map(city => (
                    <option key={city} value={city} label={city} />
                    ))}
                  </FormInputLabel>
                </>
              }
              <FieldArray
                name="references"
                render={(arrayHelpers) => {
                  const references = values.references;
                  return (
                    <div>
                      <label className='font-bold'>Datos de referidos:</label>
                      {references && references.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th className="py-2">Nombre *</th>
                                <th className="py-2">Apellido *</th>
                                <th className="py-2">Telf. referido *</th>
                                <th className="py-2">Grado de parentesco</th>
                                <th className="py-2">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {references.map((reference, index) => (
                                <tr key={index}>
                                  <td className="py-2">
                                    <FormInputLabel
                                      name={`references.${index}.name`}
                                      placeholder="Nombres"
                                      value={reference.name}
                                      touched={touched}
                                      errors={errors}
                                    />
                                  </td>
                                  <td className="py-2">
                                    <FormInputLabel
                                      name={`references.${index}.lastName`}
                                      placeholder="Apellidos"
                                      value={reference.lastName}
                                      touched={touched}
                                      errors={errors}
                                    />
                                  </td>
                                  <td className="py-2">
                                    <FormInputLabel
                                      name={`references.${index}.phoneNumber`}
                                      placeholder="Agregar telefono"
                                      autoComplete="street"
                                      value={reference.phoneNumber}
                                      touched={touched}
                                      errors={errors}
                                    />
                                  </td>
                                  <td className="py-2">
                                    <FormInputLabel
                                      name={`references.${index}.relationship`}
                                      placeholder="Ej. Padre"
                                      autoComplete="relationship"
                                      value={reference.relationship}
                                      touched={touched}
                                      errors={errors}
                                    />
                                  </td>
                                  <td className="py-4 flex items-end justify-center">
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <MdDeleteOutline className="text-2xl text-red-600 hover:bg-red-100"></MdDeleteOutline>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : null}
                      <Button
                        type="button"
                        label="Agregar nuevo referido"
                        onClick={() =>
                          arrayHelpers.push({
                            name: '',
                            lastName: '',
                            phoneNumber: '',
                            relationship: '',
                          })
                        }
                      />
                    </div>
                  );
                }}
              />
              <div className="mt-6 flex justify-end ">
                <Button
                  type="submit"
                  label="Continuar"
                >
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
}

export default CustomerForm;
