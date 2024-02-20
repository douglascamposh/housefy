import React from "react";
import PropertyListItem from "./PropertyListItem";
import Card from "../../../components/common/Card";
import HasPermission from "@/components/permissions/HasPermission";
import { methods } from "@/app/constants/constants";

const PropertyList = ({ data }) => {
  const { containerStyle } = styles;

  return (
    <HasPermission>
    <div className={`${containerStyle}`}>
      {data.map((item) => (
        (item.name && item.address?.street) &&
          <Card>
            <PropertyListItem
              key={item.id}
              name={item.name}
              id={item.id}
              images={item.images}
              description={item.description}
              address={item.address.street}
              propertiesAvailable={item.subProperties.length}
            />
          </Card>
      ))}
    </div>
    </HasPermission>
  );
};

const styles = {
  containerStyle: `
    grid 
    gap-2 
    lg:grid-cols-4 
    md:grid-cols-3 
    grid-cols-1
  `,
};

export default PropertyList;
