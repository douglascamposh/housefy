import { Formik, Form, Field, ErrorMessage  } from "formik";
import { FormInputLabel } from "@/components/common/FormInputLabel";
import Button from "@/components/common/Button";
import { Label } from "@/components/common/Label";
import { validationComputeCredit } from "@/app/utils/validations/schemaValidation";
import { Colors } from "@/app/constants/Styles";

const TableCompute = ({ data, onSubmit }) => {

  const { containerStyle, buttonStyle, dateStyle, containerDateStyle } = styles;

  const handleSubmit = (values) => {
    onSubmit(values);
  }

  return (
    <div className={`${containerStyle}`}>
      <Formik
        initialValues={data}
        validationSchema={validationComputeCredit}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue  }) => (
          <Form>
            <div>
              <div>
                <FormInputLabel
                  label="Monto total del terreno *"
                  name="total"
                  type="text"
                  autoComplete="total"
                  placeholder="Ej: 20000 Bs"
                  touched={touched}
                  errors={errors}
                  value={values.total}
                ></FormInputLabel>
              </div>
              <div>
                <FormInputLabel
                  label="Monto de aporte inicial *"
                  name="downPayment"
                  type="text"
                  autoComplete="downPayment"
                  placeholder="Ej: 4000 Bs"
                  touched={touched}
                  errors={errors}
                  value={values.downPayment}
                ></FormInputLabel>
              </div>
              <div>
                <FormInputLabel
                  label="Plazo en meses *"
                  name="months"
                  type="text"
                  autoComplete="months"
                  placeholder="Ej: 36"
                  touched={touched}
                  errors={errors}
                  value={values.months}
                ></FormInputLabel>
              </div>
              <div className={`${containerDateStyle}`}>
                <Label htmlFor="name">Fecha inicial *</Label>
                <Field  
                  type="date" 
                  name="setDate" 
                  className={`${dateStyle}`}
                  autoComplete="setDate" 
                  value={values.setDate} 
                  touched={touched}
                  errors={errors}
                  onChange={(e) => setFieldValue("setDate", e.target.value)}
                />
                <ErrorMessage name="setDate" component="div" className={Colors.primaryRed}/>
              </div>
              <div>
                <Button
                  type="submit"
                  className={`${buttonStyle}`}
                  disabled={false}
                >
                  Calcular
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const styles = {
  containerStyle: `
    overflow-x-auto 
    p-2
  `,
  buttonStyle: `
    w-full 
    mt-5 
    w-1/2
  `,
  dateStyle: `
    pl-4
  `,
  containerDateStyle: `
    mt-1
  `,
};

export default TableCompute;
