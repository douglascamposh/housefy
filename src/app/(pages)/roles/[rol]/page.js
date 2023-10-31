"use client";
import React, { useState, useEffect } from "react";
import Checkbox from "@/components/common/CheckBox";
import Button from "@/components/Form/Button";
import { useGetRolesQuery } from "@/redux/services/roleApi";
import Spinner from "@/components/Spinner";
import { useUpdateRolesMutation } from "@/redux/services/roleApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "@/app/constants/constants";
import { Logger } from "@/services/Logger";

const Page = ({ params }) => {
  const { data: rolesData, isLoading, isError } = useGetRolesQuery();
  const [updateRoles] = useUpdateRolesMutation();

  const idRol = params.rol;
  const permissionsApp = Object.keys(routes).map((key) => ({
    page: routes[key],
    methods: [],
  }));
  const roleObtained = rolesData
    ? rolesData.find((item) => item.id === idRol)
    : [];
  const [roleSelected, setRoleSelected] = useState(null);
  const [toggleAll, setToggleAll] = useState(false);
  const [permissionRol, setPermissionRol] = useState(permissionsApp);
  const [roleFunctions, setRoleFunctions] = useState(
    permissionRol.reduce((acc, permission) => {
      acc[permission.page] = {
        GET: permission.methods.includes("GET"),
        POST: permission.methods.includes("POST"),
        PUT: permission.methods.includes("PUT"),
        DELETE: permission.methods.includes("DELETE"),
      };
      return acc;
    }, {})
  );
  const [savedRoleFunctions, setSavedRoleFunctions] = useState(null);
  const updatePermissions = async (data) => {
    try {
      const response = await updateRoles({
        id: data.id,
        updateRole: data,
      });
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Permisos actualizados exitosamente");
      }
    } catch (error) {
      Logger.error("there was an error at update", error);
      toast.error("Hubo un error al actualizar los datos.");
    }
  };

  useEffect(() => {
    if (rolesData) {
      setRoleSelected(roleObtained);
      const secondArrayMap = new Map(
        roleObtained.permissions.map((item) => [item.page, item.methods])
      );

      const result = permissionsApp.map((item) => ({
        page: item.page,
        methods: secondArrayMap.get(item.page) || item.methods,
      }));

      setPermissionRol(result);

      setRoleFunctions(
        result.reduce((acc, permission) => {
          acc[permission.page] = {
            GET: permission.methods.includes("GET"),
            POST: permission.methods.includes("POST"),
            PUT: permission.methods.includes("PUT"),
            DELETE: permission.methods.includes("DELETE"),
          };
          return acc;
        }, {})
      );
    }
  }, [rolesData, idRol]);
  useEffect(() => {
    const areAllMethodsChecked = permissionsApp.every((permission) =>
      ["GET", "POST", "PUT", "DELETE"].every((method) =>
        permission.methods.includes(method)
      )
    );
    setToggleAll(areAllMethodsChecked);
  }, []);

  const handleToggleAll = () => {
    const updatedFunctions = { ...roleFunctions };
    const toggleValue = !toggleAll;
    for (const permission of permissionRol) {
      updatedFunctions[permission.page] = {
        GET: toggleValue,
        POST: toggleValue,
        PUT: toggleValue,
        DELETE: toggleValue,
      };
    }
    setToggleAll(toggleValue);
    setRoleFunctions(updatedFunctions);
  };

  const handleMethodChange = (page, method) => {
    setRoleFunctions((prevFunctions) => ({
      ...prevFunctions,
      [page]: {
        ...prevFunctions[page],
        [method]: !prevFunctions[page][method],
      },
    }));
  };

  const handleSaveChanges = async () => {
    const newRoleFunctions = Object.keys(roleFunctions).map((page) => ({
      page,
      methods: Object.keys(roleFunctions[page]).filter(
        (method) => roleFunctions[page][method]
      ),
    }));
    const copyRoleObtained = { ...roleObtained };
    copyRoleObtained.permissions = newRoleFunctions;
    setSavedRoleFunctions(newRoleFunctions);
    await updatePermissions(copyRoleObtained);
  };
  if (isLoading) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }
  if (rolesData) {
    return (
      <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">
          Rol - {roleSelected && roleSelected.roleName}
        </h1>
        <div className="sm:flex sm:justify-between">
          <div className="mt-4 sm:mt-0"></div>
          <Checkbox
            checked={toggleAll}
            onChange={handleToggleAll}
            label={toggleAll ? "Deseleccionar todos" : "Seleccionar todos"}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 text-start border-b">PAGINA</th>
                <th className="py-2 px-4 text-start border-b">VER</th>
                <th className="py-2 px-4 text-start border-b">CREAR</th>
                <th className="py-2 px-4 text-start border-b">EDITAR</th>
                <th className="py-2 px-4 text-start border-b">ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {permissionRol.map((permission) => (
                <tr key={permission.page}>
                  <td className="py-2 px-4 border-b">{permission.page}</td>
                  <td className="py-2 px-4 border-b">
                    <Checkbox
                      checked={roleFunctions[permission.page].GET}
                      onChange={() =>
                        handleMethodChange(permission.page, "GET")
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Checkbox
                      checked={roleFunctions[permission.page].POST}
                      onChange={() =>
                        handleMethodChange(permission.page, "POST")
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Checkbox
                      checked={roleFunctions[permission.page].PUT}
                      onChange={() =>
                        handleMethodChange(permission.page, "PUT")
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Checkbox
                      checked={roleFunctions[permission.page].DELETE}
                      onChange={() =>
                        handleMethodChange(permission.page, "DELETE")
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sm:flex sm:justify-between mt-4">
          <div className="mt-4 sm:mt-0"></div>
          <Button onClick={handleSaveChanges}>Guardar cambios</Button>
        </div>
      </div>
    );
  }
};

export default Page;
