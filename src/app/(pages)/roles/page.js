"use client";
import { useState } from "react";
import Button from "@/components/Form/Button";
import React from "react";
import Table from "@/components/common/Table";
import Modal from "@/components/common/Modal";
import RolForm from "@/components/Form/RolForm";
import { useGetRolesQuery } from "@/redux/services/roleApi";
import Spinner from "@/components/Spinner";
const Page = () => {
  const { data: rolesData, isLoading, isError } = useGetRolesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(rolesData);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderRowActions = (row) => {
    return (
      <div>
        <Button>Editar</Button>
        <Button>Eliminar</Button>
      </div>
    );
  };
  if (isLoading) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Gestión de Roles
        </h1>
        <Button onClick={openModal}>Crear nuevos</Button>
      </div>
      {/* {JSON.stringify(rolesData)} */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre del Rol</th>
            {/* Si tienes más propiedades en tus datos, agrégales columnas aquí */}
          </tr>
        </thead>
        <tbody>
          {rolesData.map((role) => (
            <tr key={role.id}>
              <td className="border p-2">{role.id}</td>
              <td className="border p-2">{role.roleName}</td>
              {/* Si tienes más propiedades en tus datos, agrégales celdas aquí */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Table data={rolesData} renderRowActions={renderRowActions}></Table> */}
      <Modal
        title="Registrar rol"
        isOpen={isModalOpen}
        onClose={closeModal}
        className=""
      >
        <div>
          <RolForm></RolForm>
        </div>
      </Modal>
      xdxd
    </div>
  );
};

export default Page;
