'use client'
import React from "react";
import { useGetUsersQuery } from "@/redux/services/usersApi";
import InfoTable from "@/components/InfoTable";
import Spinner from "../Spinner";
const Users = () => {
  const { data: usersData, isLoading, error } = useGetUsersQuery();

  const tableConfig = [
    { header: '#', property: 'index', render: (role, index) => { return index + 1 } },
    { header: 'Nombre', property: 'name', render: (user) => user.name },
    { header: 'Apellido', property: 'lastName' },
    { header: 'Correo electrónico', property: 'email', },
    { header: 'Función asignada', property: 'roles', render: (user) => user.roles.join(", ") }
  ]

  if (isLoading) return<Spinner/>
  if (error) {
    Logger.error("error at get the properties: " + error);
    return <ServerErrorComponent />;
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Lista de Usuarios</h1>
      <InfoTable 
        headers={tableConfig}
        renderHeader={(header) => header.header}
        data={usersData}
        renderItem={(item, header, index) => header.render ? header.render(item, index) : item[header.property]}
      />
    </>)
}

export default Users;