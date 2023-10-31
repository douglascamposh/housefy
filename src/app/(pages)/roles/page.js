"use client";
import { useState } from "react";
import Button from "@/components/Form/Button";
import React from "react";
import Modal from "@/components/common/Modal";
import RoleForm from "@/components/Form/RoleForm";
import { useGetRolesQuery } from "@/redux/services/roleApi";
import Spinner from "@/components/Spinner";
import { FiTrash2, FiEdit, FiEye } from "react-icons/fi";
import { useDeleteRolesMutation } from "@/redux/services/roleApi";
import { useRouter } from "next/navigation";
import { Logger } from "@/services/Logger";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { toast } from "react-toastify";
import ServerErrorComponent from "@/components/ServerError";

const Page = () => {
  const router = useRouter();
  const { data: rolesData, isLoading, isError } = useGetRolesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [roleSelected, setRoleSelected] = useState(null);
  const [deleteRole] = useDeleteRolesMutation();
  const [roleIdToDelete, setRoleIdToDelete] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRoleSelected(null);
  };
  const handleClickRol = (roleSelected) => {
    router.push(`/roles/${roleSelected.id}`);
  };
  const handleDeleteRol = async () => {
    Logger.info("Remover rol con id: ", roleIdToDelete);
    const result = await deleteRole(roleIdToDelete);

    if (result.error) {
      Logger.error("Error deleting rol: ", result.error);
      toast.error("No se puedo eliminar el rol");
    } else {
      toast.success("Rol eliminado correctamente");
    }
    setIsDialog(false);
  };
  if (isLoading) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <ServerErrorComponent></ServerErrorComponent>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold text-center mb-4">
        Gestión de Roles
      </h1>
      <div className="sm:flex sm:justify-between mb-4">
        <div></div>
        <Button onClick={openModal}>Agregar nuevo</Button>
      </div>

      <div className="table-responsive">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Usuarios</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rolesData.map((role, index) => (
              <tr key={role.id}>
                <td className="py-4 px-6 text-center space-x-2">{index + 1}</td>
                <td className="py-4 px-6 text-center space-x-2">
                  {role.roleName}
                </td>
                <td className="py-4 px-6 text-center space-x-2">0</td>
                <td className="py-4 px-6 text-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleClickRol(role)}
                  >
                    <FiEye size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setRoleSelected(role);
                    }}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setIsDialog(true);
                      setRoleIdToDelete(role.id);
                    }}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title={roleSelected ? "Actualizar rol" : "Agregar rol"}
        isOpen={isModalOpen}
        onClose={closeModal}
        className=""
      >
        <div>
          <RoleForm closeForm={closeModal} dataRole={roleSelected}></RoleForm>
        </div>
      </Modal>

      <ConfirmationDialog
        isOpen={isDialog}
        onCancel={() => setIsDialog(false)}
        content="¿Está seguro de que desea eliminar el rol que ha seleccionado?"
        onConfirm={handleDeleteRol}
      ></ConfirmationDialog>
    </div>
  );
};

export default Page;
