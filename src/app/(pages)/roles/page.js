import Button from '@/components/Form/Button';
import React from 'react';

const Page = () => {
  const rolesData = [
    { id: 1, name: 'Admin', description: 'Rol de administrador' },
    { id: 2, name: 'Vendedor', description: 'Rol de vendedor' },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Gestión de Roles</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left border">Roles</th>
              <th className="px-4 py-2 text-left border">Descripción</th>
              <th className="px-4 py-2 text-left border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rolesData.map((role) => (
              <tr key={role.id} className="bg-white">
                <td className="px-4 py-2 border">{role.name}</td>
                <td className="px-4 py-2 border">{role.description}</td>
                <td className="px-4 py-2 border">
                  <Button label="Ver permisos" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
