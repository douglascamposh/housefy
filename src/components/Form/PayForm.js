import { Formik, Form } from 'formik';
import { FormInputLabel } from '../common/FormInputLabel';
import { useSelector,useDispatch } from 'react-redux';
import { setData } from '@/redux/actions';
import { validationPayScheme } from '@/app/utils/validations/schemaValidation';
import { payScheme } from '@/app/utils/schema/propertySchema';
import Button from './Button';
const PayForm=(params)=> {
    const dispatch = useDispatch();
    const subPropertyInfo=params.subPropertyInfo;
    let Data = useSelector((state) => state.rootReducer.Data);
    const paySchemeCopy={...payScheme};
    paySchemeCopy.onAccount=Data.onAccount;
    const handleSubmit=(value)=>{
        let DataCopy={...Data}
        DataCopy.onAccount=value.onAccount;
        dispatch(setData(DataCopy));
        params.modifiedPage(999)
    }
    return (
      <div>
        <Formik
          initialValues={paySchemeCopy}
          enableReinitialize={true}
          validationSchema={validationPayScheme(subPropertyInfo.price)}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, values }) => (
          <Form>
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
            <p>{subPropertyInfo.price-values.onAccount}</p>
            <p className="text-gray-700">Total: </p>
            <p>{subPropertyInfo.price}</p>
            </div>
            <div className="mt-6 flex justify-between ">
            <Button
              onClick={()=>params.modifiedPage(0)}
              type="button"
              label="Anterior"
            />
            <Button
              type="submit"
              label="Continuar"
            />
            </div>
          </Form>
          )}
        </Formik>
      </div>
  )
}
export default PayForm