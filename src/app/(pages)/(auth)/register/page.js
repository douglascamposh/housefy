"use client"

import React from "react";
import { Formik, Form } from "formik";
import { RiUser3Line, RiLockLine, RiMailLine, RiPhoneLine } from "react-icons/ri";
import FormInputIcon from "@/components/common/FormInputIcon";
import Link from "next/link";
import { validationRegisterSchema } from "@/app/utils/validations/schemaValidation";
import { userCreateScheme } from "@/app/utils/schema/propertySchema";
const Register  = () => {
  const handleSubmit = (values) => {
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-200 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-2xl text-center uppercase font-bold tracking-[5px] mb-8 py-2 ">
          Crear
          <span className="text-primary"> cuenta</span>
        </h1>
        <Formik
          initialValues={userCreateScheme}
          validationSchema={validationRegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-2">
                <div className="flex space-x-4">
                    <FormInputIcon
                    icon={RiUser3Line}
                    type="text"
                    name="firstName"
                    placeholder="Nombres"
                    touched={touched}
                    errors={errors}
                />
                
                <FormInputIcon
                    icon={RiUser3Line}
                    type="text"
                    name="lastName"
                    placeholder="Apellidos"
                    touched={touched}
                    errors={errors}
                />
                </div>
              <FormInputIcon
                icon={RiMailLine}
                type="text"
                name="email"
                placeholder="Correo electronico"
                touched={touched}
                errors={errors}
              />

              <FormInputIcon
                icon={RiLockLine}
                type="password"
                name="password"
                placeholder="Contraseña"
                touched={touched}
                errors={errors}
              />
              <FormInputIcon
                icon={RiLockLine}
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Contraseña" 
                touched={touched}
                errors={errors}
              />
                <FormInputIcon
                icon={RiPhoneLine}
                type="text"
                name="phoneNumber"
                placeholder="Telefono"
                touched={touched}
                errors={errors}
              />

              <div>
                <button
                  type="submit"
                  className="bg-primary mb-3 uppercase font-bold text-sm text-white w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors"
                >
                  Registrarme
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col items-center gap-4">

            <span className="flex  items-center gap-3 ">
                ¿Ya tienes cuenta? <Link href="/login" className="text-primary hover:text-gray600 transition-colors">Ingresa</Link>
            </span>
        </div>

      </div>
    </div>
  );
};

export default Register;
