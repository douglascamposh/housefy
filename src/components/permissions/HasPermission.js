"use client";
import React from "react";
import { useGetRolesQuery } from "@/redux/services/roleApi";
import Spinner from '@/components/Spinner';
import ServerErrorComponent from "@/components/ServerError";
import { usePathname } from "next/navigation";
import { methods } from "@/app/constants/constants";

const HasPermission = ({children, to:permissionTo=methods.read}) => {
    const { data: rolesData, isLoading, isError } = useGetRolesQuery();
    const pathName = usePathname();
    const token = localStorage.getItem('token');
    if(token && rolesData) {
      const claims = JSON.parse(atob(token.split('.')[1]));
      const pagePermissions = rolesData.filter(
        ({roleName}) => claims.roles.find(currentRole => currentRole === roleName)
      ).flatMap(({permissions}) => permissions);
      //TODO: there is an issue at sales we should no permission but we are getting path of this page (example properties/id/subproperties) but in backend we have /sales
      const hasAccess = pagePermissions.find(({page}) => pathName.includes(page));
      return hasAccess && hasAccess.methods.find(method => permissionTo === method) ? (<>{children}</>) : (<></>);
    }
    
    if (isLoading) {
      return (
        <div>
          <Spinner/>
        </div>
      );
    }
    if (isError) {
      return (
        <div>
          <ServerErrorComponent/>
        </div>
      );
    }

  return (<>{children}</>);
};

export default HasPermission;
