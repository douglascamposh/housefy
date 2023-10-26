"use client";
import React, { useState } from "react";
import { FiTrash2, FiEdit, FiEye } from "react-icons/fi";
import Button from "@/components/Form/Button";
import Modal from "@/components/common/Modal";
import CsvImportSaleman from "@/components/Csv/CsvImportSaleman";

const Page = () => {
  // example
  const [users, setUsers] = useState([
    { name: "Usuario 1", lastName: "Apellido", phoneNumber: "122112" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="sm:flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Vendedores</h1>
        <Button onClick={openModal}>Importar vendedores</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600">Nombre</th>
              <th className="py-3 px-6 text-left text-gray-600">Apellido</th>
              <th className="py-3 px-6 text-left text-gray-600">Teléfono</th>
              <th className="py-3 px-6 text-center text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="transition duration-300 hover:bg-gray-50"
              >
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.lastName}</td>
                <td className="py-4 px-6">{user.phoneNumber}</td>
                <td className="py-4 px-6 text-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FiEye size={20} />
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <FiEdit size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Importar vendedores"
      >
        <CsvImportSaleman closeModal={closeModal}></CsvImportSaleman>
      </Modal>
    </div>
  );
};

export default Page;
