import React from "react";
import { useGetUsersQuery } from "@/redux/services/usersApi";
import InfoTable from "@/components/InfoTable";
import Spinner from "../Spinner";
import { columnHelper } from '@tanstack/react-table';

const Users = () => {
  const { data: usersData, isLoading, error } = useGetUsersQuery();
  
  const columns = [
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'lastName',
      header: 'Apellido',
    },
    {
      accessorKey:'email',
      header: 'Correo electrónico',
    },
    {
      accessorFn: 'funcion',
      header: 'Función asignada',
      cell: ({ row }) => {
        let roles = row.original.roles.join(", ");
        return (
          <div className="flex gap-2 items-center">
            <div>{roles}</div>
          </div>
        );
      },
    },
  ];
  

  if (isLoading) return <Spinner />
  if (error) {
    Logger.error("error at get the properties: " + error);
    return <ServerErrorComponent />;
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Lista de Usuarios</h1>
      <InfoTable data={usersData} columns={columns}/>
    </>)
}

export default Users;
