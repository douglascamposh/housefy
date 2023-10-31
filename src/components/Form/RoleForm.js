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
import { Logger } from "@/services/Logger";
const RoleForm = ({ closeForm, dataRole }) => {
  const [createRoles] = useCreateRolesMutation();
  const [updateRoles] = useUpdateRolesMutation();

  const updateRole = async (data) => {
    try {
      const response = await updateRoles({
        id: data.id,
        updateRole: data,
      });
      if (response.error) {
        Logger.error("Error updating role: ", response.error);
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
  const createRole = async (data) => {
    const response = await createRoles(data);
    if (response.error) {
      toast.error(response.error.data.message);
      Logger.error("Error creating role: ", response.error);
    } else {
      toast.success("Rol creado exitosamente");
      closeForm();
    }
  };

  const handleSubmit = async (values) => {
    if (dataRole) {
      updateRole(values);
    } else {
      createRole(values);
    }
  };
  return (
    <div className="text-black">
      <Formik
        initialValues={dataRole ? dataRole : rolSchema}
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
                {dataRole ? "Actualizar" : "Agregar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RoleForm;
