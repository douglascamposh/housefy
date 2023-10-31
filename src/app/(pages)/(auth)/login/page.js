"use client"

import React, { use, useEffect } from "react";
import { Formik, Form } from "formik";
import { useLogInMutation } from "@/redux/services/authApi";
import { RiMailLine, RiLockLine } from "react-icons/ri";
import FormInputIcon from "@/components/common/FormInputIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validationLoginSchema } from "@/app/utils/validations/schemaValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logger } from "@/services/Logger";
import Spinner from "@/components/Spinner";

const Login = () => {
  const router = useRouter();
  const [logInMutation, {data, error, isLoading}] = useLogInMutation();

  const handleSubmit = (values) => {
    logInMutation(values);
  };

  useEffect(() => {
   if(data) {
    //Todo: persist the token on local storage
     router.push(`/properties`);
   }
  }, [data]);
  
  useEffect(() => {
    if(error) {
      Logger.error('There is an error at login the user', error);
      toast.error("No se pudo iniciar sesión, revise sus datos");
    }
  }, [error]);

  return (
    isLoading ? 
    <div className="justify-center flex items-center h-screen ">
      <Spinner/>
    </div> :
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-200 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-2xl text-center uppercase font-bold tracking-[5px] mb-8 py-2 ">
          Iniciar
          <span className="text-primary"> sesión</span>
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationLoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-2">
              <FormInputIcon
                icon={RiMailLine}
                type="email"
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

              <div>
                <button
                  type="submit"
                  className="bg-primary mb-3 uppercase font-bold text-sm text-white w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors"
                >
                  Ingresar
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col items-center gap-4">
            <Link href="/" className=" hover:text-primary transition-colors">
                ¿Olvidaste tu contraseña?
            </Link >
            <span className="flex  items-center gap-3 ">
                ¿No tienes cuenta? <Link href="/register" className="text-primary hover:text-gray600 transition-colors">Registrate</Link>
            </span>
        </div>

      </div>
    </div>
  );
};

export default Login;
