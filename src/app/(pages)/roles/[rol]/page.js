"use client";
import Button from "@/components/Form/Button";
import { useState } from "react";

const functions = [
  { id: 1, title: "Propiedades", description: "Propiedades" },
  {
    id: 2,
    title: "Departamentos",
    description: "Permite editar publicaciones existentes.",
  },
  {
    id: 3,
    title: "Terrenos",
    description: "Permite editar publicaciones de terrenos.",
  },
  { id: 4, title: "Clientes", description: "Administración de clientes." },
  { id: 5, title: "Ventas", description: "Gestión de ventas realizadas." },
  {
    id: 6,
    title: "Finanzas",
    description: "Seguimiento de transacciones financieras.",
  },
  {
    id: 7,
    title: "Documentos",
    description: "Gestión de documentos relacionados con las propiedades.",
  },
  {
    id: 8,
    title: "Notificaciones",
    description: "Configuración y envío de notificaciones.",
  },
  {
    id: 9,
    title: "Informes",
    description: "Generación de informes y análisis de datos.",
  },
];

const Page = ({ params }) => {
  const rol = params.rol;
  const [toggleAll, setToggleAll] = useState(false);
  const [roleFunctions, setRoleFunctions] = useState(
    functions.reduce((acc, func) => {
      acc[func.id] = {
        access: false,
        create: false,
        modify: false,
        delete: false,
      };
      return acc;
    }, {})
  );
  const handleToggleAll = () => {
    const updatedFunctions = {};
    const toggleValue = !toggleAll;
    for (const func of functions) {
      updatedFunctions[func.id] = {
        access: toggleValue,
        create: toggleValue,
        modify: toggleValue,
        delete: toggleValue,
      };
    }
    setToggleAll(toggleValue);
    setRoleFunctions(updatedFunctions);
  };
  const handleAccessChange = (functionId) => {
    setRoleFunctions((prevFunctions) => ({
      ...prevFunctions,
      [functionId]: {
        ...prevFunctions[functionId],
        access: !prevFunctions[functionId].access,
      },
    }));
  };

  const handleCreateChange = (functionId) => {
    setRoleFunctions((prevFunctions) => ({
      ...prevFunctions,
      [functionId]: {
        ...prevFunctions[functionId],
        create: !prevFunctions[functionId].create,
      },
    }));
  };

  const handleModifyChange = (functionId) => {
    setRoleFunctions((prevFunctions) => ({
      ...prevFunctions,
      [functionId]: {
        ...prevFunctions[functionId],
        modify: !prevFunctions[functionId].modify,
      },
    }));
  };

  const handleDeleteChange = (functionId) => {
    setRoleFunctions((prevFunctions) => ({
      ...prevFunctions,
      [functionId]: {
        ...prevFunctions[functionId],
        delete: !prevFunctions[functionId].delete,
      },
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Rol: {rol}</h1>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Módulo</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Acceso</th>
            <th className="py-2 px-4 border-b">Crear</th>
            <th className="py-2 px-4 border-b">Modificar</th>
            <th className="py-2 px-4 border-b">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {functions.map((func) => (
            <tr key={func.id}>
              <td className="py-2 px-4 border-b">{func.title}</td>
              <td className="py-2 px-4 border-b">{func.description}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={roleFunctions[func.id].access}
                  onChange={() => handleAccessChange(func.id)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={roleFunctions[func.id].create}
                  onChange={() => handleCreateChange(func.id)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={roleFunctions[func.id].modify}
                  onChange={() => handleModifyChange(func.id)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={roleFunctions[func.id].delete}
                  onChange={() => handleDeleteChange(func.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button>Guardar cambios</Button>
    </div>
  );
};
export default Page;
