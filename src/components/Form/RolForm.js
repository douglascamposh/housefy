import Button from "./Button";
import { FormInputLabel } from "../common/FormInputLabel";
import { Formik, Form } from "formik";
import { validationRolScheme } from "@/app/utils/validations/schemaValidation";
import { rolSchema } from "@/app/utils/schema/rolSchema";
import { toast } from "react-toastify";
import {
  useCreateRolesMutation,
  useUpdateRolesMutation,
} from "@/redux/services/roleApi";
import "react-toastify/dist/ReactToastify.css";
const RolForm = ({ closeForm, dataRol }) => {
  const [createRoles] = useCreateRolesMutation();
  const [updateRoles] = useUpdateRolesMutation();

  const updateRol = async (data) => {
    try {
      const response = await updateRoles({
        id: data.id,
        updateRole: data,
      });
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Rol actualizado exitosamente");
        closeForm();
      }
    } catch (error) {
      Logger.error("there was an error at update", error);
      toast.error("Hubo un error al actualizar los datos.");
    }
  };
  const createRol = async (data) => {
    try {
      const response = await createRoles(data);
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Rol creado exitosamente");
        closeForm();
      }
    } catch (error) {
      Logger.error("Error al crear el rol", error);
    }
  };

  const handleSubmit = async (values) => {
    if (dataRol) {
      updateRol(values);
    } else {
      createRol(values);
    }
  };
  return (
    <div className="text-black">
      <Formik
        initialValues={dataRol ? dataRol : rolSchema}
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
              <Button type="submit">
                {dataRol ? "Actualizar" : "Agregar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RolForm;
