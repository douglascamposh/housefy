import React from "react";
import { Formik, Form, Field } from "formik";
import { FormInputLabel } from "../common/FormInputLabel";
import { Label } from "../common/Label";
import { validationSubPropertySchema } from "@/app/utils/validations/schemaValidation";
import { subPropertiesScheme } from "@/app/utils/schema/propertySchema";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import { Logger } from "@/services/Logger";
const SubPropertyForm = ({ data, isLoading, onSubmit, idSvg, onClose }) => {
  const handleSubmit = async (values, { resetForm }) => {
    const updatedValues = { ...values };
    updatedValues.svgId = idSvg;
    if (values.commonArea) {
      updatedValues.price = 0;
    }

    await handleCreateSubProperties(updatedValues, { resetForm });
  };
  const handleCreateSubProperties = async (newSubPropertiesData) => {
    try {
      onSubmit(newSubPropertiesData);
    } catch (error) {
      Logger.error(error);
    }
  };
  return (
    <div className="sm:w-96 bg-white rounded-lg shadow-2xl p-2 sm:p-6">
      <Formik
        enableReinitialize={true}
        initialValues={data || subPropertiesScheme}
        validationSchema={validationSubPropertySchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }) => (
          <Form>
            {data ? (
              <div className="mb-10">
                <label className="text-xl font-bold">Editar propiedad</label>
              </div>
            ) : (
              <div className="mb-10">
                <label className="text-xl font-bold">
                  Registro de propiedad
                </label>
              </div>
            )}

            <FormInputLabel
              label="CODIGO"
              name="code"
              placeholder="Ej. L-2323"
              autoComplete="code"
              value={values.code}
            />
            <FormInputLabel
              label="TAMAÑO (m²)"
              name="size"
              type="number"
              placeholder="Ej. 100m2"
              autoComplete="size"
              value={values.size}
            />
            <Label>
              Es Area común?
              <Field type="checkbox" name="commonArea" />
            </Label>
            {!values.commonArea ? (
              <FormInputLabel
                label="PRECIO ($)"
                name="price"
                type="number"
                placeholder="Ej. 100000$"
                autoComplete="price"
                value={values.price}
              />
            ) : null}
            <div className="flex mt-10 justify-between">
              <Button type="submit" className="w-full">
                {data ? "Actualizar" : "Registrar"}
              </Button>
              <Button type="button" onClick={onClose} className="w-full ml-2">
                Cancelar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubPropertyForm;
