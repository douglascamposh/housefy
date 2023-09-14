import { Formik, Form } from 'formik';
import { FormInputLabel } from '../common/FormInputLabel';
import Button from "./Button"
import { subPropertySaleScheme } from '@/app/utils/schema/propertySchema';
import { validationSubPropertySaleScheme } from '@/app/utils/validations/schemaValidation';
import { useCreateSalePropertyMutation } from '@/redux/services/propertiesApi';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FormSale=(params)=>{
    const [createSale, { isLoading }] = useCreateSalePropertyMutation();
    const convertFormatDate=(date)=> {
        const parts = date.split('-');
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
        const dateFormatNew = `${day}-${month}-${year}`;
        return dateFormatNew;
      }
    const handleSubmit=async(values,{resetForm})=>{
        const modifiedValues = { ...values };
        modifiedValues.propertyId = params.idProperty
        modifiedValues.subPropertyId = params.idSubProperty
        modifiedValues.customer.birthDate=convertFormatDate(values.customer.birthDate)
        await handleCreateSales(modifiedValues,{resetForm})
    }
    const handleCreateSales= async (newSaleProperty,{resetForm}) => {
        try {
          const response = await createSale( newSaleProperty );
          if (response.data){
            resetForm() 
            toast.success("Se vendio esta propiedad")
            params.onClose()
          }else{
            toast.error("No se puedo realizar la venta de la propiedad")
          }
        } catch (error) {
          toast.error("Error al realizar la venta")
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
                    label="Nombre"
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
                    label="Apellido"
                    name="customer.lastName"
                    placeholder="Ej. Lara"
                    autoComplete="lastName"
                    value={values.customer.lastName}
                    touched={touched}
                    errors={errors}
                    />
                </div>
            </div>

            <FormInputLabel
              label="Correo electronico"
              name="customer.email"
              placeholder="Ej. correo@gmail.com"
              autoComplete="email"
              value={values.customer.email}
              touched={touched}
              errors={errors}
            />
            <FormInputLabel
              label="Número de telefono"
              name="customer.phoneNumber"
              placeholder="Ej. XXXXXXXX"
              autoComplete="phoneNumber"
              value={values.customer.phoneNumber}
              touched={touched}
              errors={errors}

            />

            <FormInputLabel
              label="Fecha de nacimiento"
              name="customer.birthDate"
              type="date"
              placeholder="Ej. dd-mm-aaaa"
              autoComplete="birthDate"
              value={values.customer.birthDate}
              touched={touched}
              errors={errors}
            />
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
              <p className="text-gray-700">Total: </p>
              <p>{params.price-values.onAccount}</p>
            </div>
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