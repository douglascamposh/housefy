import Button from "./Button";
import { FormInputLabel } from "../common/FormInputLabel";
import { Formik, Form, FieldArray } from "formik";
import { validationRolScheme } from "@/app/utils/validations/schemaValidation";
import { rolSchema } from "@/app/utils/schema/rolSchema";
import { toast } from "react-toastify";
import { useCreateRolesMutation } from "@/redux/services/roleApi";
import "react-toastify/dist/ReactToastify.css";
const RolForm = () => {
  const [createRoles] = useCreateRolesMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      // Llama a la función de mutación para crear un nuevo rol
      const response = await createRoles(values);
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Rol creado exitosamente");
      }
    } catch (error) {
      // Maneja cualquier error de la solicitud aquí
      console.error("Error al crear el rol", error);
    }
  };
  return (
    <div className="text-black">
      <Formik
        initialValues={rolSchema}
        enableReinitialize={true}
        validationSchema={validationRolScheme}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }) => (
          <Form>
            {
              <>
                <div>
                  <FormInputLabel
                    label="Nombres *"
                    name="roleName"
                    placeholder="Ej. Vendedor"
                    autoComplete="roleName"
                    value={values.roleName}
                    touched={touched}
                    errors={errors}
                  />
                </div>
              </>
            }

            <div className="mt-6 flex justify-end ">
              <Button type="submit">Agregar</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RolForm;
